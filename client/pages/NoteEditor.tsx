import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  Save,
  X,
  Share2,
  Tag as TagIcon,
  Folder,
  ArrowLeft,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Type,
  Eye,
  Edit3,
  Sparkles,
  Wand2,
  Zap,
  Star,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import { fetchWithAuth } from "@/utils/api";

const categories = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "History",
  "Literature",
  "Philosophy",
  "Economics",
  "Psychology",
];

const availableTags = [
  "lecture",
  "assignment",
  "exam",
  "research",
  "project",
  "lab",
  "quiz",
  "notes",
  "important",
  "review",
  "homework",
  "study",
  "theory",
  "practical",
  "experiment",
];

export default function NoteEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== "new";
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);

  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
    categoryId: "",
    tagId: "",
    isShared: false,
    sharedWith: [] as string[],
  });

  const [newTag, setNewTag] = useState("");
  const [shareEmail, setShareEmail] = useState("");
  const fetchCategories = async () => {
    try {
      const res = await fetchWithAuth("http://localhost:4000/api/categories");
      const data = res.payload || [];

      // normalize category objects
      const normalized = data.map((c: any) => ({
        id: c._id,
        name: c.name,
      }));

      setCategories(normalized);
    } catch (err: any) {
      console.error("Error fetching categories:", err.message);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await fetchWithAuth("http://localhost:4000/api/tags");
      const data = res.payload || [];

      const normalized = data.map((t: any) => ({
        id: t._id,
        name: t.name,
        color: t.colorCode || "#000000",
      }));

      setTags(normalized);
    } catch (err: any) {
      console.error("Error fetching tags:", err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  const handleSave = async () => {
    if (!noteData.title.trim()) {
      alert("Please enter a title for your note");
      return;
    }

    setIsSaving(true);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user?._id;

      if (!userId) {
        alert("User not found. Please log in again.");
        setIsSaving(false);
        return;
      }

      const body = {
        title: noteData.title,
        content: noteData.content,
        categoryId: noteData.categoryId,
        tagId: noteData.tagId,
      };

      const url = `http://localhost:4000/api/notes/${userId}`;

      const response = await fetchWithAuth(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      // Notify dashboard to refresh
      window.dispatchEvent(new Event("notesUpdated"));

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error creating note:", error);
      alert("Error creating note. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // const handleAddTag = () => {
  //   if (newTag.trim() && !noteData.tags.includes(newTag.trim())) {
  //     setNoteData((prev) => ({
  //       ...prev,
  //       tags: [...prev.tags, newTag.trim()],
  //     }));
  //     setNewTag("");
  //   }
  // };

  // const handleRemoveTag = (tagToRemove: string) => {
  //   setNoteData((prev) => ({
  //     ...prev,
  //     tags: prev.tags.filter((tag) => tag !== tagToRemove),
  //   }));
  // };

  const handleShareNote = () => {
    if (shareEmail.trim()) {
      setNoteData((prev) => ({
        ...prev,
        isShared: true,
        sharedWith: [...prev.sharedWith, shareEmail.trim()],
      }));
      setShareEmail("");
    }
  };

  const formatText = (format: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let formattedText = "";
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "underline":
        formattedText = `__${selectedText}__`;
        break;
      case "list":
        formattedText = `\n- ${selectedText}`;
        break;
      case "numbered":
        formattedText = `\n1. ${selectedText}`;
        break;
      case "heading":
        formattedText = `\n## ${selectedText}`;
        break;
    }

    const newContent =
      noteData.content.substring(0, start) +
      formattedText +
      noteData.content.substring(end);

    setNoteData((prev) => ({ ...prev, content: newContent }));
  };

  return (
    <Layout>
      <div className="p-8 relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gold-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-400/5 to-transparent rounded-full blur-2xl animate-bounce delay-500"></div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-20 animate-float">
          <div className="w-2 h-2 bg-gold-400/30 rounded-full blur-sm"></div>
        </div>
        <div className="absolute top-40 right-32 animate-float delay-1000">
          <div className="w-3 h-3 bg-purple-400/30 rounded-full blur-sm"></div>
        </div>
        <div className="absolute bottom-32 right-20 animate-float delay-2000">
          <div className="w-1.5 h-1.5 bg-gold-300/30 rounded-full blur-sm"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Ultra-Modern Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-10"
          >
            <div className="flex items-center space-x-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => navigate("/dashboard")}
                  className="text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-xl border border-white/10 h-12 px-6 rounded-2xl transition-all duration-300"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Notes
                </Button>
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent flex items-center gap-3"
                >
                  {isEditing ? (
                    <>
                      <Edit3 className="h-8 w-8 text-gold-400" />
                      Edit Note
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-8 w-8 text-gold-400" />
                      Create New Note
                    </>
                  )}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/60 mt-2 text-lg"
                >
                  {isEditing
                    ? "Polish your thoughts to perfection"
                    : "Capture your brilliant ideas"}
                </motion.p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => setIsPreview(!isPreview)}
                  className={`h-14 px-8 transition-all duration-300 backdrop-blur-xl border ${
                    isPreview
                      ? "bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-400/30 text-purple-200 shadow-lg shadow-purple-500/10"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  }`}
                >
                  {isPreview ? (
                    <>
                      <Edit3 className="h-5 w-5 mr-2" />
                      Edit Mode
                    </>
                  ) : (
                    <>
                      <Eye className="h-5 w-5 mr-2" />
                      Preview
                    </>
                  )}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="h-14 px-8 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white border border-gold-400/30 shadow-2xl shadow-gold-500/25 hover:shadow-gold-500/40 transition-all duration-300"
                >
                  {isSaving ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                      />
                      Saving Magic...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-5 w-5 mr-2" />
                      Save Note
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Ultra-Modern Main Editor */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="xl:col-span-2"
            >
              <Card className="relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl group">
                {/* Card Glow Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-purple-500/5"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent"></div>

                <CardHeader className="relative pb-6">
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Label
                        htmlFor="title"
                        className="text-white/90 font-semibold text-lg flex items-center gap-2"
                      >
                        <Star className="h-5 w-5 text-gold-400" />
                        Note Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="Give your masterpiece a title..."
                        value={noteData.title}
                        onChange={(e) =>
                          setNoteData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="mt-3 h-16 text-xl font-bold bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/30 backdrop-blur-sm transition-all duration-300"
                      />
                    </motion.div>

                    {!isPreview && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gradient-to-r from-white/5 to-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-xl"
                      >
                        <div className="flex flex-wrap gap-3">
                          {[
                            { icon: Bold, action: "bold", label: "Bold" },
                            { icon: Italic, action: "italic", label: "Italic" },
                            {
                              icon: Underline,
                              action: "underline",
                              label: "Underline",
                            },
                            { icon: Type, action: "heading", label: "Heading" },
                            { icon: List, action: "list", label: "List" },
                            {
                              icon: ListOrdered,
                              action: "numbered",
                              label: "Numbered",
                            },
                          ].map((tool, index) => (
                            <motion.div
                              key={tool.action}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 + index * 0.05 }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => formatText(tool.action)}
                                className="h-12 w-12 p-0 text-white/70 hover:text-gold-400 hover:bg-gold-400/20 border border-white/10 hover:border-gold-400/30 rounded-xl transition-all duration-300"
                                title={tool.label}
                              >
                                <tool.icon className="h-5 w-5" />
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Label
                      htmlFor="content"
                      className="text-white/90 font-semibold text-lg flex items-center gap-2 mb-4"
                    >
                      <Heart className="h-5 w-5 text-pink-400" />
                      Content
                    </Label>
                    {isPreview ? (
                      <div className="min-h-[500px] p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-2xl backdrop-blur-xl">
                        <div className="prose prose-invert prose-lg max-w-none">
                          <div className="whitespace-pre-wrap text-white/90 leading-relaxed">
                            {noteData.content || (
                              <div className="text-center text-white/40 py-20">
                                <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                <p className="text-xl">
                                  No content to preview...
                                </p>
                                <p className="text-sm mt-2">
                                  Start writing to see the magic!
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Textarea
                        id="content"
                        placeholder="✨ Let your creativity flow... Use markdown like **bold**, *italic*, ## headings, and watch the magic happen!"
                        value={noteData.content}
                        onChange={(e) =>
                          setNoteData((prev) => ({
                            ...prev,
                            content: e.target.value,
                          }))
                        }
                        className="min-h-[500px] bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/30 backdrop-blur-xl font-mono text-base leading-relaxed resize-none transition-all duration-300"
                      />
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ultra-Modern Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-8"
            >
              {/* Category Selection */}
              <Card className="relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/20 shadow-xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>

                <CardHeader className="relative pb-4">
                  <CardTitle className="text-xl flex items-center text-white">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Folder className="h-6 w-6 mr-3 text-blue-400" />
                    </motion.div>
                    Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <Select
                    value={noteData.categoryId}
                    onValueChange={(value) =>
                      setNoteData((prev) => ({ ...prev, categoryId: value }))
                    }
                  >
                    <SelectTrigger className="h-14 bg-white/10 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/30 backdrop-blur-xl">
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent className="bg-navy-800/95 border-white/20 backdrop-blur-2xl">
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          className="text-white hover:bg-white/10"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Tags Selection */}
              <Card className="relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/20 shadow-xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>

                <CardHeader className="relative pb-4">
                  <CardTitle className="text-xl flex items-center text-white">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <TagIcon className="h-6 w-6 mr-3 text-purple-400" />
                    </motion.div>
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <Select
                    value={noteData.tagId}
                    onValueChange={(value) =>
                      setNoteData((prev) => ({ ...prev, tagId: value }))
                    }
                  >
                    <SelectTrigger className="h-14 bg-white/10 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400/30 backdrop-blur-xl">
                      <SelectValue placeholder="Choose a tag" />
                    </SelectTrigger>
                    <SelectContent className="bg-navy-800/95 border-white/20 backdrop-blur-2xl">
                      {tags.map((tag) => (
                        <SelectItem
                          key={tag.id}
                          value={tag.id}
                          className="text-white hover:bg-white/10"
                        >
                          #{tag.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Sharing */}
              <Card className="relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/20 shadow-xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>

                <CardHeader className="relative pb-4">
                  <CardTitle className="text-xl flex items-center text-white">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Share2 className="h-6 w-6 mr-3 text-green-400" />
                    </motion.div>
                    Share Note
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative space-y-6">
                  <div className="flex space-x-3">
                    <Input
                      placeholder="Email or username..."
                      value={shareEmail}
                      onChange={(e) => setShareEmail(e.target.value)}
                      className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-green-400 focus:ring-green-400/30 backdrop-blur-xl"
                    />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={handleShareNote}
                        className="h-12 px-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border border-green-400/30 shadow-lg shadow-green-500/25"
                      >
                        <Sparkles className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </motion.div>
                  </div>

                  {noteData.sharedWith.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Label className="text-sm text-white/60 mb-3 block">
                        🤝 Shared with:
                      </Label>
                      <div className="space-y-3">
                        {noteData.sharedWith.map((email, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl"
                          >
                            <span className="text-white/80">{email}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setNoteData((prev) => ({
                                  ...prev,
                                  sharedWith: prev.sharedWith.filter(
                                    (_, i) => i !== index
                                  ),
                                }))
                              }
                              className="h-8 w-8 p-0 text-white/40 hover:text-red-400 hover:bg-red-500/20"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </Layout>
  );
}
