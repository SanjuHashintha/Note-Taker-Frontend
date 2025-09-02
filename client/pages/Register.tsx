import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Eye,
  EyeOff,
  BookOpen,
  Loader2,
  Building,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    university: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.university) {
      newErrors.university = "Please select your university";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      const res = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          university: formData.university,
        }),
      });

      // Try to parse response JSON (both success and error cases)
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message =
          data?.message || "Registration failed. Please try again.";

        // Prefer field-level errors if backend provides them
        if (data?.errors && typeof data.errors === "object") {
          setErrors((prev) => ({ ...prev, ...data.errors }));
          return;
        }

        // Handle common conflict cases
        if (res.status === 409) {
          const lower = message.toLowerCase();
          if (lower.includes("email")) {
            setErrors((prev) => ({ ...prev, email: message }));
          } else if (lower.includes("user")) {
            setErrors((prev) => ({ ...prev, username: message }));
          } else {
            setErrors({ general: message });
          }
          return;
        }

        setErrors({ general: message });
        return;
      }

      // Clear any stale auth and redirect to login
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/login", {
        state: {
          message:
            "Registration successful! Please sign in with your credentials.",
          registeredUser: formData.username.trim(),
        },
      });
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra-Modern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-gold-900/20 via-transparent to-gold-800/10"></div>

      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gold-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-navy-400/5 to-transparent rounded-full blur-2xl animate-bounce delay-500"></div>

      {/* Mesh Grid Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-float">
        <div className="w-4 h-4 bg-gold-400/20 rounded-full blur-sm"></div>
      </div>
      <div className="absolute top-40 right-32 animate-float delay-1000">
        <div className="w-6 h-6 bg-accent/20 rounded-full blur-sm"></div>
      </div>
      <div className="absolute bottom-32 right-20 animate-float delay-2000">
        <div className="w-3 h-3 bg-gold-300/20 rounded-full blur-sm"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 rounded-2xl p-5 shadow-2xl">
                  <GraduationCap className="h-12 w-12 text-white" />
                  <div className="absolute top-1 right-1">
                    <Sparkles className="h-4 w-4 text-white/80 animate-pulse" />
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl font-bold bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent mb-4 tracking-tight"
            >
              Join UniNotes
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-navy-200/80 text-lg font-light"
            >
              Create your account to start your academic journey
            </motion.p>
          </motion.div>

          {/* Ultra-Modern Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -4 }}
            className="group"
          >
            <Card className="relative overflow-hidden shadow-2xl border border-white/20 bg-white/5 backdrop-blur-2xl">
              {/* Card Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-accent/5"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent"></div>

              <CardHeader className="relative space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold text-center text-white flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="h-5 w-5 text-gold-400" />
                  </motion.div>
                  Create Account
                </CardTitle>
                <CardDescription className="text-center text-navy-200/70 text-base">
                  Fill in your details to get started
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="relative space-y-6">
                  {errors.general && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 text-sm text-red-200 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm"
                    >
                      {errors.general}
                    </motion.div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      className="space-y-2"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <Label
                        htmlFor="firstName"
                        className="text-white/90 font-medium"
                      >
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold-400 focus:ring-gold-400/20 backdrop-blur-sm"
                        required
                      />
                      {errors.firstName && (
                        <p className="text-xs text-red-300">
                          {errors.firstName}
                        </p>
                      )}
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <Label
                        htmlFor="lastName"
                        className="text-white/90 font-medium"
                      >
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold-400 focus:ring-gold-400/20 backdrop-blur-sm"
                        required
                      />
                      {errors.lastName && (
                        <p className="text-xs text-red-300">
                          {errors.lastName}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  <motion.div
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Label
                      htmlFor="username"
                      className="text-white/90 font-medium"
                    >
                      Username
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-3 h-5 w-5 text-white/60 group-focus-within:text-gold-400 transition-colors" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="johndoe"
                        value={formData.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold-400 focus:ring-gold-400/20 backdrop-blur-sm"
                        required
                      />
                    </div>
                    {errors.username && (
                      <p className="text-xs text-red-300">{errors.username}</p>
                    )}
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Label
                      htmlFor="email"
                      className="text-white/90 font-medium"
                    >
                      Email Address
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-white/60 group-focus-within:text-gold-400 transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@university.edu"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold-400 focus:ring-gold-400/20 backdrop-blur-sm"
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-300">{errors.email}</p>
                    )}
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Label
                      htmlFor="university"
                      className="text-white/90 font-medium"
                    >
                      University
                    </Label>
                    <div className="relative group">
                      <Building className="absolute left-3 top-3 h-5 w-5 text-white/60 z-10" />
                      <Select
                        value={formData.university}
                        onValueChange={(value) =>
                          handleInputChange("university", value)
                        }
                      >
                        <SelectTrigger className="pl-11 h-12 bg-white/10 border-white/20 text-white focus:border-gold-400 focus:ring-gold-400/20 backdrop-blur-sm">
                          <SelectValue
                            placeholder="Select your university"
                            className="text-white/50"
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-navy-800/95 border-white/20 backdrop-blur-xl">
                          {universities.map((uni) => (
                            <SelectItem
                              key={uni}
                              value={uni}
                              className="text-white hover:bg-white/10"
                            >
                              {uni}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.university && (
                      <p className="text-xs text-red-300">
                        {errors.university}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Label
                      htmlFor="password"
                      className="text-white/90 font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative group">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="pr-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold-400 focus:ring-gold-400/20 backdrop-blur-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-white/60 hover:text-gold-400 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-300">{errors.password}</p>
                    )}
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Label
                      htmlFor="confirmPassword"
                      className="text-white/90 font-medium"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold-400 focus:ring-gold-400/20 backdrop-blur-sm"
                      required
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-300">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </motion.div>
                </CardContent>

                <CardFooter className="relative flex flex-col space-y-6 pt-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button
                      type="submit"
                      className="w-full h-14 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold transition-all duration-300 transform hover:shadow-2xl hover:shadow-gold-500/25 backdrop-blur-sm border border-gold-400/20"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-center text-sm text-white/70">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-gold-400 hover:text-gold-300 transition-colors underline underline-offset-2"
                    >
                      Sign in here
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-8 text-sm text-white/50"
          >
            <p>&copy; 2025 UniNotes. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
