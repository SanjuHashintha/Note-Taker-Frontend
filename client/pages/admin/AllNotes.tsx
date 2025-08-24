import { useState } from 'react';
import { motion } from 'framer-motion';
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
  Flag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import AdminLayout from '@/components/AdminLayout';

interface Note {
  noteid: string;
  title: string;
  content: string;
  // Optional frontend-only fields for UI
  author?: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    university: string;
    profilePic?: string;
  };
  createdAt?: string;
  updatedAt?: string;
  category?: string;
  tags?: string[];
  isShared?: boolean;
  sharedCount?: number;
  viewCount?: number;
  status?: 'active' | 'flagged' | 'deleted';
}

const mockNotes: Note[] = [
  {
    noteid: 'note_001',
    title: 'Advanced Calculus - Integration Techniques',
    content: 'Comprehensive notes on integration by parts, substitution, and partial fractions. This covers the fundamental techniques used in calculus for solving complex integrals...',
    category: 'Mathematics',
    tags: ['calculus', 'integration', 'math'],
    author: {
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@university.edu',
      university: 'MIT',
      profilePic: 'JD'
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16',
    isShared: true,
    sharedCount: 5,
    viewCount: 23,
    status: 'active'
  },
  {
    noteid: 'note_002',
    title: 'Organic Chemistry Lab Protocol',
    content: 'Step-by-step procedure for synthesizing aspirin in the laboratory. Safety procedures and equipment requirements are outlined...',
    category: 'Chemistry',
    tags: ['organic', 'lab', 'synthesis'],
    author: {
      username: 'sarahj',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@university.edu',
      university: 'Stanford University',
      profilePic: 'SJ'
    },
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
    isShared: false,
    sharedCount: 0,
    viewCount: 12,
    status: 'active'
  },
  {
    noteid: 'note_003',
    title: 'Data Structures - Binary Trees',
    content: 'Implementation and analysis of binary search trees, AVL trees, and red-black trees. Includes time complexity analysis...',
    category: 'Computer Science',
    tags: ['data-structures', 'algorithms', 'programming'],
    author: {
      username: 'mikechen',
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike@university.edu',
      university: 'Harvard University',
      profilePic: 'MC'
    },
    createdAt: '2024-01-13',
    updatedAt: '2024-01-13',
    isShared: true,
    sharedCount: 8,
    viewCount: 45,
    status: 'active'
  },
  {
    noteid: 'note_004',
    title: 'Inappropriate Content Example',
    content: 'This note contains content that has been flagged by the system...',
    category: 'History',
    tags: ['inappropriate'],
    author: {
      username: 'alexr',
      firstName: 'Alex',
      lastName: 'Rodriguez',
      email: 'alex@university.edu',
      university: 'Princeton University',
      profilePic: 'AR'
    },
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    isShared: false,
    sharedCount: 0,
    viewCount: 3,
    status: 'flagged'
  }
];

export default function AllNotes() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${note.author.firstName} ${note.author.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || note.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || note.status === statusFilter;
    
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

  const confirmDeleteNote = () => {
    if (noteToDelete) {
      setNotes(prev => prev.filter(n => n.noteid !== noteToDelete.noteid));
      setIsDeleteDialogOpen(false);
      setNoteToDelete(null);
    }
  };

  const handleStatusChange = (noteId: string, newStatus: 'active' | 'flagged' | 'deleted') => {
    setNotes(prev => prev.map(note =>
      note.noteid === noteId ? { ...note, status: newStatus } : note
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'flagged':
        return 'bg-yellow-100 text-yellow-800';
      case 'deleted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [...new Set(notes.map(note => note.category))];

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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-navy-800 to-navy-900 bg-clip-text text-transparent">All Notes</h1>
              <p className="text-gray-600 mt-2">Monitor and manage all user notes</p>
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
                    <p className="text-sm font-medium text-gray-600">Total Notes</p>
                    <p className="text-2xl font-bold text-navy-800">{notes.length}</p>
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
                    <p className="text-sm font-medium text-gray-600">Shared Notes</p>
                    <p className="text-2xl font-bold text-navy-800">
                      {notes.filter(n => n.isShared).length}
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
                    <p className="text-sm font-medium text-gray-600">Flagged Notes</p>
                    <p className="text-2xl font-bold text-navy-800">
                      {notes.filter(n => n.status === 'flagged').length}
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
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-navy-800">
                      {notes.reduce((sum, note) => sum + note.viewCount, 0)}
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
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
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
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-12 px-4"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
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
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }
          >
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note.noteid}
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
                            className={getStatusColor(note.status || 'active')}
                          >
                            {note.status || 'active'}
                          </Badge>
                          {note.isShared && (
                            <Badge variant="outline" className="border-green-500 text-green-600">
                              <Share2 className="h-3 w-3 mr-1" />
                              Shared
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg font-semibold text-navy-950 line-clamp-1">
                          {note.title}
                        </CardTitle>
                        <CardDescription className="text-navy-600">
                          {note.category}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewNote(note)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Note
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {note.status === 'flagged' ? (
                            <DropdownMenuItem onClick={() => handleStatusChange(note.noteid, 'active')}>
                              Approve Note
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleStatusChange(note.noteid, 'flagged')}>
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
                      {note.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                            {`${note.author.firstName.charAt(0)}${note.author.lastName.charAt(0)}`}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-navy-600">{`${note.author.firstName} ${note.author.lastName}`}</span>
                      </div>
                      <div className="text-xs text-navy-500 flex items-center space-x-3">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {note.viewCount}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {note.createdAt}
                        </span>
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
              <h3 className="text-xl font-semibold text-navy-700 mb-2">No notes found</h3>
              <p className="text-navy-500">Try adjusting your search or filter criteria</p>
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
                  By {`${selectedNote?.author.firstName} ${selectedNote?.author.lastName}`} • {selectedNote?.createdAt}
                </DialogDescription>
              </DialogHeader>
              {selectedNote && (
                <div className="py-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{selectedNote.category}</Badge>
                      <Badge 
                        variant="secondary" 
                        className={getStatusColor(selectedNote.status)}
                      >
                        {selectedNote.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedNote.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none bg-navy-50 p-4 rounded-lg">
                    <div className="whitespace-pre-wrap text-navy-800">
                      {selectedNote.content}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-navy-600">
                    <div>Views: {selectedNote.viewCount} | Shared: {selectedNote.sharedCount} times</div>
                    <div>Last updated: {selectedNote.updatedAt}</div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Note</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{noteToDelete?.title}"? This action cannot be undone.
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
