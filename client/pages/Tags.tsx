import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Tag as TagIcon, 
  Search,
  Hash,
  FileText,
  Save,
  X,
  Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import Layout from '@/components/Layout';

interface Tag {
  id: number;
  name: string;
  color: string;
  noteCount: number;
  createdAt: string;
}

const mockTags: Tag[] = [
  {
    id: 1,
    name: 'calculus',
    color: '#3B82F6',
    noteCount: 12,
    createdAt: '2024-01-01'
  },
  {
    id: 2,
    name: 'programming',
    color: '#10B981',
    noteCount: 18,
    createdAt: '2024-01-02'
  },
  {
    id: 3,
    name: 'lab',
    color: '#F59E0B',
    noteCount: 8,
    createdAt: '2024-01-03'
  },
  {
    id: 4,
    name: 'important',
    color: '#EF4444',
    noteCount: 25,
    createdAt: '2024-01-04'
  },
  {
    id: 5,
    name: 'exam',
    color: '#8B5CF6',
    noteCount: 15,
    createdAt: '2024-01-05'
  },
  {
    id: 6,
    name: 'algorithms',
    color: '#06B6D4',
    noteCount: 9,
    createdAt: '2024-01-06'
  },
  {
    id: 7,
    name: 'physics',
    color: '#84CC16',
    noteCount: 6,
    createdAt: '2024-01-07'
  },
  {
    id: 8,
    name: 'review',
    color: '#F97316',
    noteCount: 11,
    createdAt: '2024-01-08'
  }
];

const predefinedColors = [
  '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', 
  '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1',
  '#14B8A6', '#F472B6', '#A855F7', '#22C55E', '#EAB308'
];

export default function Tags() {
  const [tags, setTags] = useState<Tag[]>(mockTags);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'usage' | 'date'>('usage');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    color: predefinedColors[0]
  });

  const filteredAndSortedTags = tags
    .filter(tag =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'usage':
          return b.noteCount - a.noteCount;
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  const resetForm = () => {
    setFormData({
      name: '',
      color: predefinedColors[0]
    });
  };

  const handleCreate = () => {
    if (!formData.name.trim()) return;

    // Check if tag already exists
    if (tags.some(tag => tag.name.toLowerCase() === formData.name.toLowerCase())) {
      alert('A tag with this name already exists!');
      return;
    }

    const newTag: Tag = {
      id: Date.now(),
      name: formData.name.toLowerCase().replace(/\s+/g, '-'),
      color: formData.color,
      noteCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTags(prev => [...prev, newTag]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedTag || !formData.name.trim()) return;

    // Check if tag name already exists (excluding current tag)
    if (tags.some(tag => 
      tag.id !== selectedTag.id && 
      tag.name.toLowerCase() === formData.name.toLowerCase()
    )) {
      alert('A tag with this name already exists!');
      return;
    }

    setTags(prev => prev.map(tag => 
      tag.id === selectedTag.id 
        ? { 
            ...tag, 
            name: formData.name.toLowerCase().replace(/\s+/g, '-'), 
            color: formData.color 
          }
        : tag
    ));
    setIsEditDialogOpen(false);
    setSelectedTag(null);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedTag) return;

    setTags(prev => prev.filter(tag => tag.id !== selectedTag.id));
    setIsDeleteDialogOpen(false);
    setSelectedTag(null);
  };

  const openEditDialog = (tag: Tag) => {
    setSelectedTag(tag);
    setFormData({
      name: tag.name,
      color: tag.color
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (tag: Tag) => {
    setSelectedTag(tag);
    setIsDeleteDialogOpen(true);
  };

  const getRandomColor = () => {
    return predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-navy-950">Tags</h1>
              <p className="text-navy-600 mt-2">Manage and organize your note tags</p>
            </div>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Tag
            </Button>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
              <Input
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-white border-navy-200 focus:border-accent focus:ring-accent"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={sortBy === 'usage' ? 'default' : 'outline'}
                onClick={() => setSortBy('usage')}
                size="sm"
                className="h-12"
              >
                Most Used
              </Button>
              <Button
                variant={sortBy === 'name' ? 'default' : 'outline'}
                onClick={() => setSortBy('name')}
                size="sm"
                className="h-12"
              >
                A-Z
              </Button>
              <Button
                variant={sortBy === 'date' ? 'default' : 'outline'}
                onClick={() => setSortBy('date')}
                size="sm"
                className="h-12"
              >
                Newest
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">Total Tags</p>
                    <p className="text-2xl font-bold text-navy-950">{tags.length}</p>
                  </div>
                  <div className="p-2 rounded-full bg-blue-500">
                    <TagIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">Tagged Notes</p>
                    <p className="text-2xl font-bold text-navy-950">
                      {tags.reduce((sum, tag) => sum + tag.noteCount, 0)}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-green-500">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">Most Popular</p>
                    <p className="text-lg font-bold text-navy-950">
                      {tags.length > 0 ? tags.reduce((prev, current) => 
                        prev.noteCount > current.noteCount ? prev : current).name : 'None'}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-purple-500">
                    <Hash className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">Avg Usage</p>
                    <p className="text-2xl font-bold text-navy-950">
                      {tags.length > 0 ? Math.round(tags.reduce((sum, tag) => sum + tag.noteCount, 0) / tags.length) : 0}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-orange-500">
                    <Palette className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tags Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {filteredAndSortedTags.map((tag, index) => (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="relative group bg-white/80 backdrop-blur-sm border-navy-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: tag.color + '20', border: `2px solid ${tag.color}` }}
                      >
                        <TagIcon 
                          className="h-6 w-6" 
                          style={{ color: tag.color }}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-950 text-sm">#{tag.name}</h3>
                        <p className="text-xs text-navy-600 mt-1">
                          {tag.noteCount} {tag.noteCount === 1 ? 'note' : 'notes'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Action buttons - hidden by default, shown on hover */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditDialog(tag);
                        }}
                        className="h-6 w-6 p-0 text-navy-400 hover:text-accent bg-white/80"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteDialog(tag);
                        }}
                        className="h-6 w-6 p-0 text-navy-400 hover:text-red-600 bg-white/80"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredAndSortedTags.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <TagIcon className="h-16 w-16 text-navy-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy-700 mb-2">
                {searchTerm ? 'No tags found' : 'No tags yet'}
              </h3>
              <p className="text-navy-500 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Create your first tag to organize your notes'
                }
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Tag
                </Button>
              )}
            </motion.div>
          )}

          {/* Create/Edit Dialog */}
          <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
            if (!open) {
              setIsCreateDialogOpen(false);
              setIsEditDialogOpen(false);
              resetForm();
              setSelectedTag(null);
            }
          }}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <TagIcon className="h-5 w-5 mr-2 text-accent" />
                  {isCreateDialogOpen ? 'Create New Tag' : 'Edit Tag'}
                </DialogTitle>
                <DialogDescription>
                  {isCreateDialogOpen 
                    ? 'Add a new tag to organize your notes'
                    : 'Update the tag details'
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tag Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., important, exam, lab"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="border-navy-200 focus:border-accent focus:ring-accent"
                  />
                  <p className="text-xs text-navy-500">
                    Spaces will be replaced with hyphens. Tag will be converted to lowercase.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setFormData(prev => ({ ...prev, color }))}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          formData.color === color 
                            ? 'border-navy-950 scale-110' 
                            : 'border-navy-200 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, color: getRandomColor() }))}
                    className="mt-2"
                  >
                    Random Color
                  </Button>
                </div>
                <div className="p-3 bg-navy-50 rounded-lg">
                  <p className="text-sm text-navy-600">Preview:</p>
                  <Badge 
                    className="mt-2"
                    style={{ 
                      backgroundColor: formData.color + '20', 
                      color: formData.color,
                      border: `1px solid ${formData.color}`
                    }}
                  >
                    #{formData.name || 'tag-name'}
                  </Badge>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateDialogOpen(false);
                    setIsEditDialogOpen(false);
                    resetForm();
                    setSelectedTag(null);
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={isCreateDialogOpen ? handleCreate : handleEdit}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={!formData.name.trim()}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isCreateDialogOpen ? 'Create' : 'Update'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Tag</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete the tag "#{selectedTag?.name}"? 
                  This tag is used in {selectedTag?.noteCount} notes. 
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Layout>
  );
}
