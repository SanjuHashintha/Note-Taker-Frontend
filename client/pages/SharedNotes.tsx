import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, 
  Eye, 
  User, 
  Clock, 
  Search,
  Filter,
  ExternalLink,
  UserCheck,
  UserX,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';

interface SharedNote {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  sharedBy: {
    name: string;
    email: string;
    avatar: string;
  };
  sharedWith: {
    name: string;
    email: string;
    avatar: string;
  };
  sharedAt: string;
  lastViewed?: string;
  permission: 'view' | 'edit';
  isOwner: boolean;
}

const mockSharedNotes: SharedNote[] = [
  {
    id: 1,
    title: 'Advanced Calculus - Integration Techniques',
    content: 'Comprehensive notes on integration by parts, substitution, and partial fractions...',
    category: 'Mathematics',
    tags: ['calculus', 'integration', 'math'],
    sharedBy: {
      name: 'Alice Johnson',
      email: 'alice@university.edu',
      avatar: 'AJ'
    },
    sharedWith: {
      name: 'John Doe',
      email: 'john@university.edu',
      avatar: 'JD'
    },
    sharedAt: '2024-01-15',
    lastViewed: '2024-01-16',
    permission: 'view',
    isOwner: false
  },
  {
    id: 2,
    title: 'Organic Chemistry Lab Protocol',
    content: 'Step-by-step procedure for synthesizing aspirin in the laboratory...',
    category: 'Chemistry',
    tags: ['organic', 'lab', 'synthesis'],
    sharedBy: {
      name: 'John Doe',
      email: 'john@university.edu',
      avatar: 'JD'
    },
    sharedWith: {
      name: 'Sarah Wilson',
      email: 'sarah@university.edu',
      avatar: 'SW'
    },
    sharedAt: '2024-01-14',
    permission: 'edit',
    isOwner: true
  },
  {
    id: 3,
    title: 'Data Structures - Binary Trees',
    content: 'Implementation and analysis of binary search trees, AVL trees, and red-black trees...',
    category: 'Computer Science',
    tags: ['data-structures', 'trees', 'algorithms'],
    sharedBy: {
      name: 'Mike Chen',
      email: 'mike@university.edu',
      avatar: 'MC'
    },
    sharedWith: {
      name: 'John Doe',
      email: 'john@university.edu',
      avatar: 'JD'
    },
    sharedAt: '2024-01-13',
    lastViewed: '2024-01-14',
    permission: 'view',
    isOwner: false
  },
  {
    id: 4,
    title: 'Physics - Quantum Mechanics Fundamentals',
    content: 'Wave functions, Schrödinger equation, and quantum operators...',
    category: 'Physics',
    tags: ['quantum', 'physics', 'theory'],
    sharedBy: {
      name: 'John Doe',
      email: 'john@university.edu',
      avatar: 'JD'
    },
    sharedWith: {
      name: 'Emily Davis',
      email: 'emily@university.edu',
      avatar: 'ED'
    },
    sharedAt: '2024-01-12',
    lastViewed: '2024-01-13',
    permission: 'view',
    isOwner: true
  }
];

export default function SharedNotes() {
  const [sharedNotes] = useState<SharedNote[]>(mockSharedNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('received');
  const [selectedNote, setSelectedNote] = useState<SharedNote | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareEmails, setShareEmails] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const filteredNotes = sharedNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === 'received') {
      return matchesSearch && !note.isOwner;
    } else {
      return matchesSearch && note.isOwner;
    }
  });

  const handleViewNote = (note: SharedNote) => {
    setSelectedNote(note);
    setIsViewDialogOpen(true);
  };

  const handleShareNote = (note: SharedNote) => {
    setSelectedNote(note);
    setIsShareDialogOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://uninotes.app/shared/${selectedNote?.id}`);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const receivedNotes = sharedNotes.filter(note => !note.isOwner);
  const sharedByMeNotes = sharedNotes.filter(note => note.isOwner);

  return (
    <Layout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-navy-950">Shared Notes</h1>
            <p className="text-navy-600 mt-2">Collaborate and share knowledge with your peers</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">Received</p>
                    <p className="text-2xl font-bold text-navy-950">{receivedNotes.length}</p>
                  </div>
                  <div className="p-2 rounded-full bg-blue-500">
                    <UserCheck className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">Shared by Me</p>
                    <p className="text-2xl font-bold text-navy-950">{sharedByMeNotes.length}</p>
                  </div>
                  <div className="p-2 rounded-full bg-green-500">
                    <Share2 className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">Unread</p>
                    <p className="text-2xl font-bold text-navy-950">
                      {receivedNotes.filter(note => !note.lastViewed).length}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-orange-500">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">Collaborators</p>
                    <p className="text-2xl font-bold text-navy-950">
                      {new Set(sharedNotes.map(note => note.isOwner ? note.sharedWith.email : note.sharedBy.email)).size}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-purple-500">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
              <Input
                placeholder="Search shared notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-white border-navy-200 focus:border-accent focus:ring-accent"
              />
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
                <TabsTrigger value="received" className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Received ({receivedNotes.length})
                </TabsTrigger>
                <TabsTrigger value="shared" className="flex items-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Shared by Me ({sharedByMeNotes.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="received" className="space-y-4">
                {filteredNotes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-navy-200 hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {!note.lastViewed && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                  New
                                </Badge>
                              )}
                              <Badge 
                                variant="outline" 
                                className={note.permission === 'edit' ? 'border-green-500 text-green-600' : 'border-gray-500 text-gray-600'}
                              >
                                {note.permission === 'edit' ? 'Can Edit' : 'View Only'}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg font-semibold text-navy-950">
                              {note.title}
                            </CardTitle>
                            <CardDescription className="text-navy-600">
                              {note.category}
                            </CardDescription>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewNote(note)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-navy-700 line-clamp-2 mb-4">
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
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                                {note.sharedBy.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <p className="font-medium text-navy-700">{note.sharedBy.name}</p>
                              <p className="text-navy-500">{note.sharedBy.email}</p>
                            </div>
                          </div>
                          <div className="text-right text-sm text-navy-500">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Shared {note.sharedAt}
                            </div>
                            {note.lastViewed && (
                              <div className="text-xs">
                                Last viewed {note.lastViewed}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="shared" className="space-y-4">
                {filteredNotes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-navy-200 hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold text-navy-950">
                              {note.title}
                            </CardTitle>
                            <CardDescription className="text-navy-600">
                              {note.category}
                            </CardDescription>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShareNote(note)}
                            >
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewNote(note)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-navy-700 line-clamp-2 mb-4">
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
                          <div className="flex items-center space-x-3">
                            <div className="text-sm text-navy-600">
                              Shared with:
                            </div>
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                                {note.sharedWith.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <p className="font-medium text-navy-700">{note.sharedWith.name}</p>
                            </div>
                          </div>
                          <div className="text-sm text-navy-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {note.sharedAt}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </motion.div>

          {filteredNotes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Share2 className="h-16 w-16 text-navy-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy-700 mb-2">
                {searchTerm ? 'No shared notes found' : `No ${activeTab === 'received' ? 'received' : 'shared'} notes`}
              </h3>
              <p className="text-navy-500 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : activeTab === 'received' 
                    ? 'No one has shared any notes with you yet'
                    : 'You haven\'t shared any notes yet'
                }
              </p>
            </motion.div>
          )}

          {/* View Note Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-accent" />
                  {selectedNote?.title}
                </DialogTitle>
                <DialogDescription>
                  {selectedNote?.isOwner ? 'Your note' : `Shared by ${selectedNote?.sharedBy.name}`}
                </DialogDescription>
              </DialogHeader>
              {selectedNote && (
                <div className="py-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{selectedNote.category}</Badge>
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
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Share Note Dialog */}
          <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Share2 className="h-5 w-5 mr-2 text-accent" />
                  Share Note
                </DialogTitle>
                <DialogDescription>
                  Share "{selectedNote?.title}" with others
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="emails">Email addresses (comma separated)</Label>
                  <Input
                    id="emails"
                    placeholder="student1@university.edu, student2@university.edu"
                    value={shareEmails}
                    onChange={(e) => setShareEmails(e.target.value)}
                    className="border-navy-200 focus:border-accent focus:ring-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Share Link</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={`https://uninotes.app/shared/${selectedNote?.id}`}
                      readOnly
                      className="border-navy-200"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyLink}
                      className="px-3"
                    >
                      {copySuccess ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  {copySuccess && (
                    <p className="text-sm text-green-600">Link copied to clipboard!</p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // Handle sharing logic here
                    setIsShareDialogOpen(false);
                    setShareEmails('');
                  }}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invites
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}
