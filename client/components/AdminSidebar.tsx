import { motion } from 'framer-motion';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  FileText,
  LogOut,
  Shield
} from 'lucide-react';

const adminSidebarItems = [
  { icon: BarChart3, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'User Management', path: '/admin/users' },
  { icon: FileText, label: 'All Notes', path: '/admin/notes' }
];

export default function AdminSidebar() {
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
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 min-h-screen bg-gradient-to-b from-navy-900 via-navy-800 to-navy-950 border-r border-gold-500/20 shadow-xl"
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl p-3 shadow-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gold-200 bg-clip-text text-transparent">UniNotes</h1>
            <p className="text-xs text-gold-300/80">Admin Panel</p>
          </div>
        </div>

        <div className="space-y-2">
          {adminSidebarItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-white shadow-lg border border-gold-400/50'
                      : 'text-gold-200/80 hover:bg-navy-700/60 hover:text-gold-100 border border-transparent hover:border-gold-500/30'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: adminSidebarItems.length * 0.1 }}
            className="pt-6 mt-4 border-t border-gold-500/30"
          >
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-gold-200/80 hover:bg-red-600/20 hover:text-red-400 border border-transparent hover:border-red-500/30"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
}
