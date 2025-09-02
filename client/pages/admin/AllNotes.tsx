import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Search,
  Filter,
  Eye,
  Trash2,
  Share2,
  User,
  Calendar,
  Tag,
  Grid,
  List,
  MoreHorizontal,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AdminLayout from "@/components/AdminLayout";
import { fetchWithAuth } from "@/utils/api";

interface Note {
  _id: string;
  title: string;
  content: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    university?: string;
  };
  categoryId?: {
    _id: string;
    name: string;
    description?: string;
    color?: string;
  };
  tagId?: {
    _id: string;
    name: string;
    colorCode?: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  // Frontend-only fields for UI
  isShared?: boolean;
  sharedCount?: number;
  viewCount?: number;
  status?: "active" | "flagged" | "deleted";
}

export default function AllNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notes from API
  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchWithAuth("http://localhost:4000/api/notes", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (data?.status === 200) {
        const apiNotes: Note[] = data.payload.notes.map((note: any) => ({
          _id: note._id,
          title: note.title,
          content: note.content,
          user: note.user,
          categoryId: note.categoryId,
          tagId: note.tagId,
          createdAt: note.createdAt,
          updatedAt: note.updatedAt,
          __v: note.__v,
          // Default UI values
          isShared: Math.random() > 0.5, // You might want to get this from API
          sharedCount: Math.floor(Math.random() * 10),
          viewCount: Math.floor(Math.random() * 50),
          status: "active", // Default status
        }));

        setNotes(apiNotes);
      } else {
        throw new Error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Failed to load notes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${note.user.firstName} ${note.user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      note.tagId?.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || note.categoryId?.name === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || note.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewNote = (note: Note) => {
    setSelectedNote(note);
    setIsViewDialogOpen(true);
  };

  const handleDeleteNote = (note: Note) => {
    setNoteToDelete(note);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteNote = async () => {
    if (noteToDelete) {
      try {
        const response = await fetchWithAuth(
          `http://localhost:4000/api/notes/${noteToDelete._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.status === 200) {
          // Refetch notes after successful deletion
          await fetchNotes();
        } else {
          throw new Error("Failed to delete note");
        }
      } catch (error) {
        console.error("Error deleting note:", error);
        alert("Error deleting note. Please try again.");
      } finally {
        setIsDeleteDialogOpen(false);
        setNoteToDelete(null);
      }
    }
  };

  const handleStatusChange = async (
    noteId: string,
    newStatus: "active" | "flagged" | "deleted"
  ) => {
    try {
      // You might want to implement an API endpoint for status updates
      // For now, we'll just update the local state
      setNotes((prev) =>
        prev.map((note) =>
          note._id === noteId ? { ...note, status: newStatus } : note
        )
      );

      // If you have an API endpoint for status updates, use this:
      // await fetchWithAuth(`http://localhost:4000/api/notes/${noteId}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus })
      // });
    } catch (error) {
      console.error("Error updating note status:", error);
      alert("Error updating note status. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "flagged":
        return "bg-yellow-100 text-yellow-800";
      case "deleted":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const categories = [
    ...new Set(notes.map((note) => note.categoryId?.name).filter(Boolean)),
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-navy-600">Loading notes...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <FileText className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-navy-700 mb-2">
              Error loading notes
            </h3>
            <p className="text-navy-500 mb-6">{error}</p>
            <Button
              onClick={fetchNotes}
              className="bg-accent hover:bg-accent/90"
            >
              Try Again
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-navy-800 to-navy-900 bg-clip-text text-transparent">
                All Notes
              </h1>
              <p className="text-gray-600 mt-2">
                Monitor and manage all user notes
              </p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
          >
            <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Notes
                    </p>
                    <p className="text-2xl font-bold text-navy-800">
                      {notes.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-navy-500 to-navy-600">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Shared Notes
                    </p>
                    <p className="text-2xl font-bold text-navy-800">
                      {notes.filter((n) => n.isShared).length}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600">
                    <Share2 className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Flagged Notes
                    </p>
                    <p className="text-2xl font-bold text-navy-800">
                      {notes.filter((n) => n.status === "flagged").length}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-gray-500 to-gray-600">
                    <Flag className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Views
                    </p>
                    <p className="text-2xl font-bold text-navy-800">
                      {notes.reduce(
                        (sum, note) => sum + (note.viewCount || 0),
                        0
                      )}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-gold-600 to-gold-500">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
              <Input
                placeholder="Search notes, authors, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-white border-navy-200 focus:border-accent focus:ring-accent"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48 h-12 border-navy-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 h-12 border-navy-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="deleted">Deleted</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-12 px-4"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-12 px-4"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Notes Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg hover:shadow-xl hover:border-gold-400/40 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge
                            variant="secondary"
                            className={getStatusColor(note.status || "active")}
                          >
                            {note.status || "active"}
                          </Badge>
                          {note.isShared && (
                            <Badge
                              variant="outline"
                              className="border-green-500 text-green-600"
                            >
                              <Share2 className="h-3 w-3 mr-1" />
                              Shared
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg font-semibold text-navy-950 line-clamp-1">
                          {note.title}
                        </CardTitle>
                        <CardDescription className="text-navy-600">
                          {note.categoryId?.name || "Uncategorized"}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleViewNote(note)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Note
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {note.status === "flagged" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(note._id, "active")
                              }
                            >
                              Approve Note
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(note._id, "flagged")
                              }
                            >
                              Flag Note
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDeleteNote(note)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Note
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-navy-700 line-clamp-3 mb-4">
                      {note.content}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {note.tagId && (
                        <Badge
                          key={note.tagId._id}
                          variant="outline"
                          className="text-xs"
                        >
                          {note.tagId.name}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                            {note.user.firstName && note.user.lastName
                              ? `${note.user.firstName.charAt(0)}${note.user.lastName.charAt(0)}`
                              : note.user.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-navy-600">{`${note.user.firstName} ${note.user.lastName}`}</span>
                      </div>
                      <div className="text-xs text-navy-500 flex items-center space-x-3">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {note.viewCount}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredNotes.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FileText className="h-16 w-16 text-navy-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy-700 mb-2">
                No notes found
              </h3>
              <p className="text-navy-500">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}

          {/* View Note Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-accent" />
                  {selectedNote?.title}
                </DialogTitle>
                <DialogDescription>
                  By{" "}
                  {`${selectedNote?.user.firstName} ${selectedNote?.user.lastName}`}{" "}
                  •{" "}
                  {selectedNote &&
                    new Date(selectedNote.createdAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              {selectedNote && (
                <div className="py-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {selectedNote.categoryId?.name || "Uncategorized"}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(
                          selectedNote.status || "active"
                        )}
                      >
                        {selectedNote.status || "active"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedNote.tagId && (
                        <Badge
                          key={selectedNote.tagId._id}
                          variant="secondary"
                          className="text-xs"
                        >
                          {selectedNote.tagId.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none bg-navy-50 p-4 rounded-lg">
                    <div className="whitespace-pre-wrap text-navy-800">
                      {selectedNote.content}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-navy-600">
                    <div>
                      Views: {selectedNote.viewCount} | Shared:{" "}
                      {selectedNote.sharedCount} times
                    </div>
                    <div>
                      Last updated:{" "}
                      {new Date(selectedNote.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Note</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{noteToDelete?.title}"? This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmDeleteNote}
                  className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                >
                  Delete Note
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </AdminLayout>
  );
}
