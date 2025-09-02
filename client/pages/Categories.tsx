import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Folder,
  Search,
  FolderOpen,
  FileText,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import Layout from "@/components/Layout";
import { fetchWithAuth } from "@/utils/api";

interface Category {
  categorycode: string;
  name: string;
  description: string;
  color?: string;
  createdAt: string;
}

// const mockCategories: Category[] = [
//   {
//     categorycode: 'MATH001',
//     name: 'Mathematics',
//     description: 'Calculus, algebra, statistics, and mathematical concepts',
//     color: '#3B82F6',
//     noteCount: 15,
//     createdAt: '2024-01-01'
//   },
//   {
//     categorycode: 'CS001',
//     name: 'Computer Science',
//     description: 'Programming, algorithms, data structures, and software development',
//     color: '#10B981',
//     noteCount: 23,
//     createdAt: '2024-01-02'
//   },
//   {
//     categorycode: 'PHY001',
//     name: 'Physics',
//     description: 'Quantum mechanics, thermodynamics, and physical laws',
//     color: '#8B5CF6',
//     noteCount: 8,
//     createdAt: '2024-01-03'
//   },
//   {
//     categorycode: 'CHEM001',
//     name: 'Chemistry',
//     description: 'Organic chemistry, lab experiments, and chemical reactions',
//     color: '#F59E0B',
//     noteCount: 12,
//     createdAt: '2024-01-04'
//   },
//   {
//     categorycode: 'HIST001',
//     name: 'History',
//     description: 'World history, historical events, and cultural studies',
//     color: '#EF4444',
//     noteCount: 6,
//     createdAt: '2024-01-05'
//   }
// ];

const predefinedColors = [
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#EC4899",
  "#6366F1",
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: predefinedColors[0],
  });

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      color: predefinedColors[0],
    });
  };
  const fetchCategories = async () => {
    try {
      const res = await fetchWithAuth("http://localhost:4000/api/categories");

      if (!res.payload || !Array.isArray(res.payload)) {
        setCategories([]);
        return;
      }

      const normalized = res.payload.map(
        (item: any): Category => ({
          categorycode: item._id,
          name: item.name || "Unnamed Category",
          description: item.description || "No description",
          color:
            item.color ||
            predefinedColors[
              Math.floor(Math.random() * predefinedColors.length)
            ],
          createdAt: item.createdAt || new Date().toISOString(), // fallback
        })
      );

      setCategories(normalized);
    } catch (err: any) {
      console.error("Error fetching categories:", err.message);
      alert("Failed to load categories: " + err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!formData.name.trim()) return;

    const payload = {
      name: formData.name,
      description: formData.description,
      color: formData.color,
    };

    try {
      await fetchWithAuth("http://localhost:4000/api/categories", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      await fetchCategories(); // Refetch to get backend response (with _id)

      setIsCreateDialogOpen(false);
      resetForm();
    } catch (err: any) {
      console.error("Error creating category:", err.message);
      alert("Failed to create category: " + err.message);
    }
  };

  const handleEdit = async () => {
    if (!selectedCategory || !formData.name.trim()) return;

    const payload = {
      name: formData.name,
      description: formData.description,
      color: formData.color,
    };

    try {
      await fetchWithAuth(
        `http://localhost:4000/api/categories/${selectedCategory.categorycode}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
        }
      );

      await fetchCategories();

      setIsEditDialogOpen(false);
      setSelectedCategory(null);
      resetForm();
    } catch (err: any) {
      console.error("Error updating category:", err.message);
      alert("Failed to update category: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    try {
      await fetchWithAuth(
        `http://localhost:4000/api/categories/${selectedCategory.categorycode}`,
        {
          method: "DELETE",
        }
      );

      // ✅ Refetch after delete
      await fetchCategories();

      setIsDeleteDialogOpen(false);
      setSelectedCategory(null);
    } catch (err: any) {
      console.error("Error deleting category:", err.message);
      alert("Failed to delete category: " + err.message);
    }
  };

  const openEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color || predefinedColors[0],
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const formatDateTime = (isoString: string): string => {
    try {
      const date = new Date(isoString);

      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }

      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
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
              <h1 className="text-3xl font-bold text-navy-950">Categories</h1>
              <p className="text-navy-600 mt-2">
                Organize your notes into meaningful categories
              </p>
            </div>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Category
            </Button>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-white border-navy-200 focus:border-accent focus:ring-accent"
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">
                      Total Categories
                    </p>
                    <p className="text-2xl font-bold text-navy-950">
                      {categories.length}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-blue-500">
                    <Folder className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">
                      Total Notes
                    </p>
                    <p className="text-2xl font-bold text-navy-950">
                      {categories.reduce((sum, cat) => sum + cat.noteCount, 0)}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-green-500">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card> */}
            {/* <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">
                      Most Used
                    </p>
                    <p className="text-lg font-bold text-navy-950">
                      {categories.length > 0
                        ? categories.reduce((prev, current) =>
                            prev.noteCount > current.noteCount ? prev : current
                          ).name
                        : "None"}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-purple-500">
                    <FolderOpen className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.categorycode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-navy-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <CardTitle className="text-lg font-semibold text-navy-950">
                          {category.name}
                        </CardTitle>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(category)}
                          className="h-8 w-8 p-0 text-navy-400 hover:text-accent"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteDialog(category)}
                          className="h-8 w-8 p-0 text-navy-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-navy-600 mb-4 min-h-[3rem]">
                      {category.description}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      {/* <Badge
                        variant="secondary"
                        className="bg-navy-100 text-navy-700"
                      >
                        {category.noteCount}{" "}
                        {category.noteCount === 1 ? "note" : "notes"}
                      </Badge> */}
                      <span className="text-xs text-navy-500">
                        Created {formatDateTime(category.createdAt)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredCategories.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Folder className="h-16 w-16 text-navy-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy-700 mb-2">
                {searchTerm ? "No categories found" : "No categories yet"}
              </h3>
              <p className="text-navy-500 mb-6">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Create your first category to organize your notes"}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Category
                </Button>
              )}
            </motion.div>
          )}

          {/* Create/Edit Dialog */}
          <Dialog
            open={isCreateDialogOpen || isEditDialogOpen}
            onOpenChange={(open) => {
              if (!open) {
                setIsCreateDialogOpen(false);
                setIsEditDialogOpen(false);
                resetForm();
                setSelectedCategory(null);
              }
            }}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Folder className="h-5 w-5 mr-2 text-accent" />
                  {isCreateDialogOpen ? "Create New Category" : "Edit Category"}
                </DialogTitle>
                <DialogDescription>
                  {isCreateDialogOpen
                    ? "Add a new category to organize your notes"
                    : "Update the category details"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Mathematics"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="border-navy-200 focus:border-accent focus:ring-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Brief description of this category"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="border-navy-200 focus:border-accent focus:ring-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, color }))
                        }
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          formData.color === color
                            ? "border-navy-950 scale-110"
                            : "border-navy-200 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateDialogOpen(false);
                    setIsEditDialogOpen(false);
                    resetForm();
                    setSelectedCategory(null);
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
                  {isCreateDialogOpen ? "Create" : "Update"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Category</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{selectedCategory?.name}"?
                  This category contains notes. This action cannot be undone.
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
