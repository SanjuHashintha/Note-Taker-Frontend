import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Shield, 
  Star, 
  ArrowRight, 
  GraduationCap, 
  Sparkles, 
  Brain, 
  Target, 
  Award,
  CheckCircle,
  Zap,
  Globe,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Smart Note Organization',
      description: 'Organize your notes with intelligent categories and tags that adapt to your study patterns.'
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Share notes with classmates and work together on projects with real-time collaboration.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your academic work is protected with enterprise-grade security and privacy controls.'
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get smart suggestions and insights to enhance your learning and note-taking efficiency.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Computer Science Student',
      content: 'UniNotes transformed how I organize my coursework. The collaborative features are incredible!',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Graduate Student',
      content: 'The best note-taking platform I\'ve used. Clean, fast, and incredibly intuitive.',
      rating: 5
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Professor',
      content: 'My students love using UniNotes for assignments. It\'s made collaboration so much easier.',
      rating: 5
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Students' },
    { number: '500+', label: 'Universities' },
    { number: '1M+', label: 'Notes Created' },
    { number: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Black, Navy Blue & Gold Background */}
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/30 via-transparent to-navy-800/20"></div>

      {/* Animated Glass Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gold-500/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-navy-500/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-gold-400/10 to-transparent rounded-full blur-2xl animate-bounce delay-500"></div>
      
      {/* Mesh Grid Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Glass Elements */}
      <div className="absolute top-20 left-20 animate-float">
        <div className="w-4 h-4 bg-gradient-to-r from-gold-400/30 to-navy-500/20 backdrop-blur-sm rounded-full border border-gold-400/20 shadow-lg"></div>
      </div>
      <div className="absolute top-40 right-32 animate-float delay-1000">
        <div className="w-6 h-6 bg-gradient-to-r from-navy-500/25 to-gold-500/15 backdrop-blur-sm rounded-full border border-navy-400/20 shadow-lg"></div>
      </div>
      <div className="absolute bottom-32 right-20 animate-float delay-2000">
        <div className="w-3 h-3 bg-gradient-to-r from-gold-500/35 to-navy-400/25 backdrop-blur-sm rounded-full border border-gold-300/20 shadow-lg"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between p-6 md:p-8"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/30 to-navy-500/20 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity backdrop-blur-sm"></div>
              <div className="relative bg-gradient-to-r from-navy-800/40 to-gold-600/30 backdrop-blur-lg rounded-xl p-3 shadow-xl border border-gold-400/30">
                <GraduationCap className="h-8 w-8 text-gold-300" />
              </div>
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gold-200 bg-clip-text text-transparent">
              UniNotes
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gold-200 hover:text-gold-100 hover:bg-navy-800/30 backdrop-blur-sm border border-navy-500/20 hover:border-gold-400/30 transition-all">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-gold-600/30 to-navy-700/30 backdrop-blur-sm hover:from-gold-500/40 hover:to-navy-600/40 text-white border border-gold-400/30 hover:border-gold-300/50 transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="px-6 md:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center mb-6"
            >
              <Sparkles className="h-6 w-6 text-gold-400 mr-2 animate-pulse" />
              <span className="text-gold-200 font-semibold bg-gradient-to-r from-navy-800/40 to-gold-900/30 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-400/30">The Future of Academic Note-Taking</span>
              <Sparkles className="h-6 w-6 text-gold-400 ml-2 animate-pulse" />
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Revolutionize Your
              <br />
              <span className="bg-gradient-to-r from-gold-400 to-gold-200 bg-clip-text text-transparent">
                Study Experience
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-navy-100/80 mb-12 leading-relaxed max-w-3xl mx-auto">
              The most powerful and intuitive note-taking platform designed specifically for university students.
              Organize, collaborate, and excel in your academic journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-gold-600 to-gold-500 backdrop-blur-lg hover:from-gold-500 hover:to-gold-400 text-black px-8 py-4 text-lg font-semibold shadow-2xl shadow-gold-500/25 border border-gold-400/50 hover:border-gold-300/70 h-auto transition-all">
                    Start Taking Notes
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/register">
                  <Button variant="outline" className="border-navy-400/40 backdrop-blur-sm bg-navy-800/20 text-gold-200 hover:bg-navy-700/40 hover:border-navy-300/60 hover:text-gold-100 px-8 py-4 text-lg h-auto transition-all">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="px-6 md:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold-400 to-gold-200 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-navy-200/80 font-medium">
                  {stat.label}
                </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 md:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gold-200 bg-clip-text text-transparent mb-6">
                Powerful Features for Modern Students
              </h2>
              <p className="text-xl text-navy-100/70 max-w-3xl mx-auto">
                Everything you need to organize, create, and collaborate on your academic work.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="h-full border border-navy-400/30 bg-gradient-to-br from-navy-900/80 to-gold-900/60 backdrop-blur-xl hover:from-navy-800/90 hover:to-gold-800/70 hover:border-gold-400/40 transition-all duration-300 shadow-lg">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gold-500/30 to-navy-600/30 backdrop-blur-sm rounded-2xl mb-6 group-hover:scale-110 transition-transform border border-gold-400/40">
                        <feature.icon className="h-8 w-8 text-gold-300" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-navy-100/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-6 md:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gold-200 bg-clip-text text-transparent mb-6">
                Loved by Students Everywhere
              </h2>
              <p className="text-xl text-navy-100/70">
                Join thousands of students who have transformed their study habits.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border border-navy-400/30 bg-gradient-to-br from-navy-900/70 to-gold-900/50 backdrop-blur-xl h-full hover:from-navy-800/80 hover:to-gold-800/60 hover:border-gold-400/40 transition-all duration-300 shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-gold-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-navy-100/80 mb-6 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <div className="font-semibold text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-gold-300/70 text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-navy-500/10 rounded-3xl blur-2xl"></div>
              <Card className="relative border border-gold-400/30 bg-gradient-to-br from-navy-900/90 to-gold-900/70 backdrop-blur-2xl shadow-2xl">
                <CardContent className="p-12">
                  <div className="flex items-center justify-center mb-6">
                    <Heart className="h-8 w-8 text-gold-400 mr-3" />
                    <Globe className="h-8 w-8 text-navy-300 mr-3" />
                    <Award className="h-8 w-8 text-gold-400" />
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gold-200 bg-clip-text text-transparent mb-6">
                    Ready to Transform Your Studies?
                  </h2>

                  <p className="text-xl text-navy-100/70 mb-8 leading-relaxed">
                    Join the revolution in academic note-taking. Create your account today and discover
                    a better way to organize your university experience.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link to="/register">
                        <Button className="bg-gradient-to-r from-gold-600 to-gold-500 backdrop-blur-lg hover:from-gold-500 hover:to-gold-400 text-black px-8 py-4 text-lg font-semibold shadow-2xl shadow-gold-500/25 border border-gold-400/50 hover:border-gold-300/70 h-auto transition-all">
                          Get Started Free
                          <CheckCircle className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </motion.div>

                    <p className="text-navy-200/60 text-sm">
                      No credit card required • Free forever
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="px-6 md:px-8 py-12 border-t border-gold-400/20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="bg-gradient-to-r from-gold-500/30 to-navy-600/30 backdrop-blur-sm rounded-xl p-2 border border-gold-400/40">
                  <GraduationCap className="h-6 w-6 text-gold-300" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-gold-200 bg-clip-text text-transparent">
                  UniNotes
                </span>
              </div>

              <div className="flex items-center space-x-8 text-navy-200/70">
                <a href="#" className="hover:text-gold-300 transition-colors">Privacy</a>
                <a href="#" className="hover:text-gold-300 transition-colors">Terms</a>
                <a href="#" className="hover:text-gold-300 transition-colors">Support</a>
                <a href="#" className="hover:text-gold-300 transition-colors">Contact</a>
              </div>
            </div>

            <div className="text-center mt-8 pt-8 border-t border-navy-500/20">
              <p className="text-navy-200/50">
                &copy; 2025 UniNotes. All rights reserved. Built with ❤️ for students.
              </p>
            </div>
          </div>
        </footer>
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
