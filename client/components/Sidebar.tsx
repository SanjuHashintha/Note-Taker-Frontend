import { motion } from 'framer-motion';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Grid, 
  Tag, 
  Share2, 
  User, 
  LogOut
} from 'lucide-react';

const sidebarItems = [
  { icon: FileText, label: 'All Notes', path: '/dashboard' },
  { icon: Grid, label: 'Categories', path: '/categories' },
  { icon: Tag, label: 'Tags', path: '/tags' },
  { icon: Share2, label: 'Shared Notes', path: '/shared' },
  { icon: User, label: 'Profile', path: '/profile' }
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Navigate to login page
    navigate('/login');
  };

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-64 min-h-screen bg-white/3 backdrop-blur-3xl border-r border-white/10 shadow-2xl relative group"
    >
      {/* Ultra-Premium Sidebar Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold-500/8 via-purple-500/3 to-blue-500/5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/3"></div>

      {/* Premium Border Effects */}
      <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-gold-400/40 to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent"></div>

      {/* Animated Glow Lines */}
      <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-gold-400/60 to-transparent animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-px h-32 bg-gradient-to-t from-purple-400/40 to-transparent animate-pulse delay-1000"></div>

      {/* Floating Particles Inside Sidebar */}
      <div className="absolute top-20 left-8 w-1 h-1 bg-gold-400/30 rounded-full animate-float"></div>
      <div className="absolute top-40 right-8 w-0.5 h-0.5 bg-purple-400/40 rounded-full animate-float delay-1000"></div>
      <div className="absolute bottom-32 left-12 w-1.5 h-1.5 bg-gold-300/20 rounded-full animate-sparkle"></div>

      <div className="relative p-8">
        <motion.div
          className="flex items-center space-x-4 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {/* Multi-layer Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gold-300 to-gold-500 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>

            {/* Logo Container */}
            <div className="relative bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 rounded-2xl p-3 shadow-2xl border border-gold-300/30">
              <BookOpen className="h-7 w-7 text-white" />

              {/* Sparkle Effect */}
              <div className="absolute -top-1 -right-1 w-3 h-3">
                <div className="w-full h-full bg-white rounded-full animate-ping opacity-75"></div>
                <div className="absolute inset-0 w-full h-full bg-gold-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.h1
              className="text-2xl font-bold bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              UniNotes
            </motion.h1>
            <motion.p
              className="text-xs text-white/50 mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Student Portal
            </motion.p>
          </div>
        </motion.div>

        <div className="space-y-3">
          {sidebarItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ x: 5 }}
              >
                <Link
                  to={item.path}
                  className={`relative w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-left transition-all duration-500 group overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-500/25 via-gold-600/20 to-gold-500/15 text-white border border-gold-400/40 shadow-lg shadow-gold-500/20'
                      : 'text-white/60 hover:bg-white/8 hover:text-white hover:border-white/20 border border-transparent backdrop-blur-sm'
                  }`}
                >
                  {/* Active Item Glow */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-400/10 to-transparent animate-shimmer"></div>
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-400 to-gold-600 rounded-r-full"></div>
                    </>
                  )}

                  {/* Hover Effect */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon className={`h-6 w-6 transition-all duration-300 ${
                      isActive
                        ? 'text-gold-300 drop-shadow-lg'
                        : 'group-hover:text-gold-400 group-hover:drop-shadow-lg'
                    }`} />
                  </motion.div>

                  <span className={`font-semibold tracking-wide transition-all duration-300 ${
                    isActive ? 'text-white' : 'group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>

                  {/* Premium Indicator */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="ml-auto"
                    >
                      <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse shadow-lg shadow-gold-400/50"></div>
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            );
          })}
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: sidebarItems.length * 0.1 }}
          >
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 text-white/70 hover:bg-red-500/20 hover:text-red-300 hover:border-red-400/30 border border-transparent group"
            >
              <LogOut className="h-5 w-5 group-hover:text-red-400 transition-colors" />
              <span className="font-medium">Logout</span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
}
