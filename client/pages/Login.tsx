import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  BookOpen,
  Loader2,
  Sparkles,
  GraduationCap,
  Shield,
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
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("🚀 ~ handleSubmit ~ data:", data);

      if (data.status === 200) {
        const userData = {
          ...data.payload,
          token: data.payload.token, // keep token for API calls
        };

        // Save in context + localStorage
        login(userData);

        // Redirect by role
        if (userData.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        alert("Login failed: " + (data.message || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong while logging in.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
          className="w-full max-w-md"
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
                    <Shield className="h-4 w-4 text-white/80" />
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
              UniNotes
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-navy-200/80 text-lg font-light"
            >
              Your Digital University Notebook
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
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-center text-navy-200/70 text-base">
                  Sign in to access your notes
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="relative space-y-6">
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
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="pl-11 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold-400 focus:ring-gold-400/20 backdrop-blur-sm text-lg"
                        required
                      />
                    </div>
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
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-white/60 group-focus-within:text-gold-400 transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="pl-11 pr-11 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold-400 focus:ring-gold-400/20 backdrop-blur-sm text-lg"
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
                      className="w-full h-14 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold transition-all duration-300 transform hover:shadow-2xl hover:shadow-gold-500/25 backdrop-blur-sm border border-gold-400/20 text-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          <Shield className="mr-2 h-5 w-5" />
                          Sign In
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-center text-sm text-white/70">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-gold-400 hover:text-gold-300 transition-colors underline underline-offset-2"
                    >
                      Sign up here
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
