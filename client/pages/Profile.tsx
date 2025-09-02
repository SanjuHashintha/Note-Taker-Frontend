import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Building,
  Camera,
  Save,
  Eye,
  EyeOff,
  Shield,
  Bell,
  Palette,
  Download,
  Trash2,
  Check,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
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

const universities = [
  // Government Universities
  "University of Colombo",
  "University of Peradeniya",
  "University of Sri Jayewardenepura",
  "University of Kelaniya",
  "University of Moratuwa",
  "University of Ruhuna",
  "Eastern University, Sri Lanka",
  "South Eastern University of Sri Lanka",
  "Wayamba University of Sri Lanka",
  "University of the Visual & Performing Arts",
  "University of Jaffna",
  "Rajarata University of Sri Lanka",
  "Sabaragamuwa University of Sri Lanka",
  "Uva Wellassa University",
  "Open University of Sri Lanka",

  // Private Universities
  "Sri Lanka Institute of Information Technology (SLIIT)",
  "National Institute of Business Management (NIBM)",
  "Sri Lanka International Buddhist Academy (SIBA)",
  "Horizon Campus",
  "NSBM Green University",
  "Asia Pacific Institute of Information Technology (APIIT)",
  "Aquinas University College",
  "South Asian Institute of Technology and Medicine (SAITM)",
  "International College of Business and Technology (ICBT)",
  "Academy of Design",
  "American National College",
  "Ceylon Institute of Technology",
  "Colombo International Nautical and Engineering College (CINEC)",
  "International Institute of Health Sciences (IIHS)",
  "Kandy School of Medicine",
  "Lanka Institute of Fashion Technology (LIFT)",
  "Malabe Campus - University of Westminster",
  "NIST Institute",
  "One World University",
  "Pearson Institute of Higher Education",
  "Sri Lanka Institute of Development Administration (SLIDA)",
  "University College Dublin - Sri Lanka",
  "Virtusa Institute of Information Technology",
];

export default function Profile() {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    university: "Stanford University",
    role: "Student",
    joinedDate: "2024-01-01",
    profilePicture: "" as string,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    shareByDefault: false,
    theme: "light",
    language: "en",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
        if (!userId) return;

        const response = await fetchWithAuth(
          `http://localhost:4000/api/users?id=${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response?.status === 200 && response.payload?.length > 0) {
          const user = response.payload[0];
          setProfileData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            university: user.university || "",
            role: user.role || "",
            joinedDate: new Date(user.createdAt).toISOString().split("T")[0],
            profilePicture: user.profilePic || null,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileSave = async () => {
    setIsSaving(true);
    try {
      // Simulate save operation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    // Reset errors
    setPasswordErrors({});
    const errors: Record<string, string> = {};

    // Validate passwords
    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }
    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setIsSaving(true);
    try {
      // Simulate password change
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file); // create temporary URL
      setProfileData((prev) => ({ ...prev, profilePicture: objectUrl }));
    }
  };

  const handleExportData = () => {
    // Simulate data export
    const data = {
      profile: profileData,
      notes: "All user notes would be exported here...",
      categories: "All categories...",
      tags: "All tags...",
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uninotes-data-export.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    // This would actually delete the account
    console.log("Account deletion requested");
    setIsDeleteDialogOpen(false);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-navy-950">
              Profile Settings
            </h1>
            <p className="text-navy-600 mt-2">
              Manage your account and preferences
            </p>
          </motion.div>

          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"
            >
              <Check className="h-5 w-5 text-green-600 mr-3" />
              <span className="text-green-800">
                Settings saved successfully!
              </span>
            </motion.div>
          )}

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="data">Data & Privacy</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-accent" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details and university information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center space-x-6">
                      <Avatar className="h-24 w-24">
                        {profileData.profilePicture ? (
                          <img
                            src={profileData.profilePicture}
                            alt="Profile"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <AvatarFallback className="bg-accent text-accent-foreground text-xl">
                            {profileData.firstName[0]}
                            {profileData.lastName[0]}
                          </AvatarFallback>
                        )}
                      </Avatar>

                      <div>
                        <Label
                          htmlFor="picture"
                          className="text-navy-700 font-medium"
                        >
                          Profile Picture
                        </Label>
                        <div className="flex items-center space-x-3 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              document.getElementById("picture")?.click()
                            }
                          >
                            <Camera className="h-4 w-4 mr-2" />
                            Upload Photo
                          </Button>
                          <input
                            id="picture"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <span className="text-sm text-navy-500">
                            {profileData.profilePicture
                              ? profileData.profilePicture
                              : "No file selected"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-navy-700 font-medium"
                        >
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                          className="border-navy-200 focus:border-accent focus:ring-accent"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-navy-700 font-medium"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          className="border-navy-200 focus:border-accent focus:ring-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-navy-700 font-medium"
                      >
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="pl-10 border-navy-200 focus:border-accent focus:ring-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="university"
                        className="text-navy-700 font-medium"
                      >
                        University
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-navy-400 z-10" />
                        <Select
                          value={profileData.university}
                          onValueChange={(value) =>
                            setProfileData((prev) => ({
                              ...prev,
                              university: value,
                            }))
                          }
                        >
                          <SelectTrigger className="pl-10 border-navy-200 focus:border-accent focus:ring-accent">
                            <SelectValue placeholder="Select University" />
                          </SelectTrigger>
                          <SelectContent>
                            {universities.map((uni) => (
                              <SelectItem key={uni} value={uni}>
                                {uni}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-navy-700 font-medium">
                          Role
                        </Label>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge
                            variant="secondary"
                            className="bg-accent/10 text-accent"
                          >
                            {profileData.role}
                          </Badge>
                          <span className="text-sm text-navy-500">
                            Member since {profileData.joinedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleProfileSave}
                        disabled={isSaving}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-accent" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Change your password and manage security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="currentPassword"
                          className="text-navy-700 font-medium"
                        >
                          Current Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPasswords.current ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                              setPasswordData((prev) => ({
                                ...prev,
                                currentPassword: e.target.value,
                              }))
                            }
                            className="pr-10 border-navy-200 focus:border-accent focus:ring-accent"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswords((prev) => ({
                                ...prev,
                                current: !prev.current,
                              }))
                            }
                            className="absolute right-3 top-3 text-navy-400 hover:text-navy-600"
                          >
                            {showPasswords.current ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        {passwordErrors.currentPassword && (
                          <p className="text-xs text-red-600">
                            {passwordErrors.currentPassword}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="newPassword"
                          className="text-navy-700 font-medium"
                        >
                          New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showPasswords.new ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) =>
                              setPasswordData((prev) => ({
                                ...prev,
                                newPassword: e.target.value,
                              }))
                            }
                            className="pr-10 border-navy-200 focus:border-accent focus:ring-accent"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswords((prev) => ({
                                ...prev,
                                new: !prev.new,
                              }))
                            }
                            className="absolute right-3 top-3 text-navy-400 hover:text-navy-600"
                          >
                            {showPasswords.new ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        {passwordErrors.newPassword && (
                          <p className="text-xs text-red-600">
                            {passwordErrors.newPassword}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="confirmPassword"
                          className="text-navy-700 font-medium"
                        >
                          Confirm New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showPasswords.confirm ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                              setPasswordData((prev) => ({
                                ...prev,
                                confirmPassword: e.target.value,
                              }))
                            }
                            className="pr-10 border-navy-200 focus:border-accent focus:ring-accent"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswords((prev) => ({
                                ...prev,
                                confirm: !prev.confirm,
                              }))
                            }
                            className="absolute right-3 top-3 text-navy-400 hover:text-navy-600"
                          >
                            {showPasswords.confirm ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        {passwordErrors.confirmPassword && (
                          <p className="text-xs text-red-600">
                            {passwordErrors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handlePasswordChange}
                        disabled={isSaving}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 mr-2" />
                            Update Password
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="h-5 w-5 mr-2 text-accent" />
                      Preferences
                    </CardTitle>
                    <CardDescription>
                      Customize your UniNotes experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-navy-700 font-medium">
                            Email Notifications
                          </Label>
                          <p className="text-sm text-navy-500">
                            Receive notifications about shared notes and updates
                          </p>
                        </div>
                        <Switch
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) =>
                            setSettings((prev) => ({
                              ...prev,
                              emailNotifications: checked,
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-navy-700 font-medium">
                            Push Notifications
                          </Label>
                          <p className="text-sm text-navy-500">
                            Get notified instantly on your device
                          </p>
                        </div>
                        <Switch
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) =>
                            setSettings((prev) => ({
                              ...prev,
                              pushNotifications: checked,
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-navy-700 font-medium">
                            Share by Default
                          </Label>
                          <p className="text-sm text-navy-500">
                            Make new notes shareable by default
                          </p>
                        </div>
                        <Switch
                          checked={settings.shareByDefault}
                          onCheckedChange={(checked) =>
                            setSettings((prev) => ({
                              ...prev,
                              shareByDefault: checked,
                            }))
                          }
                        />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label className="text-navy-700 font-medium">
                          Theme
                        </Label>
                        <Select
                          value={settings.theme}
                          onValueChange={(value) =>
                            setSettings((prev) => ({ ...prev, theme: value }))
                          }
                        >
                          <SelectTrigger className="border-navy-200 focus:border-accent focus:ring-accent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="auto">Auto (System)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-navy-700 font-medium">
                          Language
                        </Label>
                        <Select
                          value={settings.language}
                          onValueChange={(value) =>
                            setSettings((prev) => ({
                              ...prev,
                              language: value,
                            }))
                          }
                        >
                          <SelectTrigger className="border-navy-200 focus:border-accent focus:ring-accent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleProfileSave}
                        disabled={isSaving}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Data & Privacy Tab */}
            <TabsContent value="data">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="space-y-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                    <CardHeader>
                      <CardTitle>Data Export</CardTitle>
                      <CardDescription>
                        Download all your data including notes, categories, and
                        tags
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={handleExportData}
                        variant="outline"
                        className="border-navy-200"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-red-50 border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-800">
                        Danger Zone
                      </CardTitle>
                      <CardDescription className="text-red-600">
                        Irreversible actions that will permanently affect your
                        account
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => setIsDeleteDialogOpen(true)}
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Delete Account Confirmation */}
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you absolutely sure you want to delete your account? This
                  action cannot be undone. All your notes, categories, tags, and
                  shared content will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                >
                  Yes, Delete My Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Layout>
  );
}
