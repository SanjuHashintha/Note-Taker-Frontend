import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  FileText,
  Tag,
  Share2,
  Grid,
  List,
  Calendar,
  Clock,
  Edit,
  Trash2,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Layout from "@/components/Layout";

// Initial mock data for notes - will be used to seed localStorage if empty
const initialMockNotes = [
  {
    noteid: "note_001",
    id: 1,
    title: "Advanced Calculus - Derivatives",
    content: "Chain rule, product rule, and quotient rule applications...",
    category: "Mathematics",
    tags: ["calculus", "derivatives", "math"],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    isShared: false,
  },
  {
    noteid: "note_002",
    id: 2,
    title: "Organic Chemistry Lab Notes",
    content: "Synthesis of aspirin experiment procedures and observations...",
    category: "Chemistry",
    tags: ["organic", "lab", "synthesis"],
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
    isShared: true,
  },
  {
    noteid: "note_003",
    id: 3,
    title: "World History - Industrial Revolution",
    content: "Key factors leading to industrialization in Europe...",
    category: "History",
    tags: ["history", "industrial", "europe"],
    createdAt: "2024-01-13",
    updatedAt: "2024-01-13",
    isShared: false,
  },
  {
    noteid: "note_004",
    id: 4,
    title: "Physics - Quantum Mechanics",
    content: "Wave-particle duality and uncertainty principle fundamentals...",
    category: "Physics",
    tags: ["quantum", "physics", "mechanics"],
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
    isShared: false,
  },
  {
    noteid: "note_005",
    id: 5,
    title: "Computer Science - Data Structures",
    content: "Binary trees, linked lists, and hash tables implementation...",
    category: "Computer Science",
    tags: ["data structures", "algorithms", "programming"],
    createdAt: "2024-01-11",
    updatedAt: "2024-01-11",
    isShared: true,
  },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [notes, setNotes] = useState<any[]>([]);
  const [noteToDelete, setNoteToDelete] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(parsedNotes);
      } catch (error) {
        console.error("Error parsing saved notes:", error);
        setNotes(initialMockNotes);
        localStorage.setItem("notes", JSON.stringify(initialMockNotes));
      }
    } else {
      // Initialize with mock data if no saved notes
      setNotes(initialMockNotes);
      localStorage.setItem("notes", JSON.stringify(initialMockNotes));
    }
  }, []);

  // Listen for storage changes to update notes when they're modified elsewhere
  useEffect(() => {
    const handleStorageChange = () => {
      const savedNotes = localStorage.getItem("notes");
      if (savedNotes) {
        try {
          const parsedNotes = JSON.parse(savedNotes);
          setNotes(parsedNotes);
        } catch (error) {
          console.error("Error parsing saved notes:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom events when notes are updated within the same tab
    window.addEventListener("notesUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("notesUpdated", handleStorageChange);
    };
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleCreateNote = () => {
    navigate("/note/new");
  };

  const handleEditNote = (note: any) => {
    // Use noteid if available, otherwise fall back to id
    const noteIdentifier = note.noteid || note.id;
    navigate(`/note/${noteIdentifier}`);
  };

  const handleDeleteNote = (note: any) => {
    setNoteToDelete(note);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteNote = () => {
    if (noteToDelete) {
      const updatedNotes = notes.filter((note) => {
        const noteId = note.noteid || note.id;
        const deleteId = noteToDelete.noteid || noteToDelete.id;
        return noteId !== deleteId;
      });

      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));

      // Dispatch custom event to notify other components of the change
      window.dispatchEvent(new Event("notesUpdated"));

      setIsDeleteDialogOpen(false);
      setNoteToDelete(null);
    }
  };

  return (
    <Layout>
      <div className="p-6 relative">
        {/* Modern Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gold-400/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-2xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-navy-950">
                Welcome back,{" "}
                {JSON.parse(localStorage.getItem("user") || "{}").firstName ||
                  "User"}
                !
              </h2>
              <p className="text-navy-600 mt-1">
                You have {notes.length} notes in your collection
              </p>
            </div>
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <Avatar>
                <AvatarFallback className="bg-accent text-accent-foreground">
                  {`${JSON.parse(localStorage.getItem("user") || "{}").firstName?.[0] || ""}${JSON.parse(localStorage.getItem("user") || "{}").lastName?.[0] || ""}`}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Search and Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-4 h-5 w-5 text-white/60" />
              <Input
                placeholder="Search notes, tags, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold-400 focus:ring-gold-400/20 backdrop-blur-xl"
              />
            </div>
            <div className="flex space-x-3">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`h-14 px-6 transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white border-gold-400/20 shadow-lg shadow-gold-500/25"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-xl"
                }`}
              >
                <Grid className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-14 px-6 transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white border-gold-400/20 shadow-lg shadow-gold-500/25"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-xl"
                }`}
              >
                <List className="h-5 w-5" />
              </Button>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleCreateNote}
                  className="h-14 px-8 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white border border-gold-400/20 shadow-lg shadow-gold-500/25 hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Note
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
          >
            {[
              {
                title: "Total Notes",
                value: notes.length.toString(),
                icon: FileText,
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-500/10",
              },
              {
                title: "Categories",
                value: [
                  ...new Set(notes.map((n) => n.category)),
                ].length.toString(),
                icon: Grid,
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-500/10",
              },
              {
                title: "Shared",
                value: notes.filter((n) => n.isShared).length.toString(),
                icon: Share2,
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-500/10",
              },
              {
                title: "This Week",
                value: notes
                  .filter((n) => {
                    const noteDate = new Date(n.createdAt);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return noteDate >= weekAgo;
                  })
                  .length.toString(),
                icon: Calendar,
                color: "from-orange-500 to-orange-600",
                bgColor: "bg-orange-500/10",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group"
              >
                <Card className="relative bg-white/10 backdrop-blur-xl border border-white/20 hover:border-gold-400/30 transition-all duration-300 overflow-hidden">
                  <div
                    className={`absolute inset-0 ${stat.bgColor} opacity-50`}
                  ></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent"></div>
                  <CardContent className="relative p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-navy-200/80 mb-1">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-white">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg group-hover:shadow-xl transition-shadow`}
                      >
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Notes Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
              >
                <Card
                  className="h-full bg-white/5 backdrop-blur-xl border border-white/20 hover:border-gold-400/30 hover:bg-white/10 transition-all duration-300 cursor-pointer group overflow-hidden"
                  onClick={() => handleEditNote(note)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent"></div>
                  <CardHeader className="relative pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold text-white line-clamp-1">
                        {note.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {note.isShared && (
                          <Badge className="bg-gradient-to-r from-gold-500/20 to-gold-600/20 text-gold-300 border border-gold-400/30">
                            <Share2 className="h-3 w-3 mr-1" />
                            Shared
                          </Badge>
                        )}
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-white/60 hover:text-gold-400 hover:bg-white/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditNote(note);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-white/60 hover:text-red-400 hover:bg-red-500/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNote(note);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-white/70">
                      {note.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-sm text-white/80 line-clamp-3 mb-4">
                      {note.content}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {note.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {note.updatedAt}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredNotes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FileText className="h-16 w-16 text-navy-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy-700 mb-2">
                No notes found
              </h3>
              <p className="text-navy-500 mb-6">
                Try adjusting your search or create a new note
              </p>
              <Button
                onClick={handleCreateNote}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Note
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent className="bg-navy-900/95 backdrop-blur-xl border border-white/20">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Delete Note
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white/70">
                Are you sure you want to delete "{noteToDelete?.title}"? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeleteNote}
                className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
}
