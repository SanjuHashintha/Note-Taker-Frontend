import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  Share2,
  TrendingUp,
  Calendar,
  Clock,
  UserCheck,
  UserX,
  AlertTriangle,
  Activity,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import AdminLayout from '@/components/AdminLayout';

// Mock data for admin dashboard
const mockStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalNotes: 15673,
  sharedNotes: 3421,
  newUsersToday: 23,
  notesCreatedToday: 156,
  systemHealth: 98
};

const recentUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@university.edu',
    university: 'Stanford University',
    joinedDate: '2024-01-20',
    status: 'active',
    notesCount: 45
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike@university.edu',
    university: 'MIT',
    joinedDate: '2024-01-19',
    status: 'active',
    notesCount: 23
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily@university.edu',
    university: 'Harvard University',
    joinedDate: '2024-01-18',
    status: 'inactive',
    notesCount: 12
  }
];

const systemAlerts = [
  {
    id: 1,
    type: 'warning',
    message: 'Storage usage at 85% capacity',
    timestamp: '2024-01-20T10:30:00Z'
  },
  {
    id: 2,
    type: 'info',
    message: 'Scheduled maintenance at 2 AM EST',
    timestamp: '2024-01-20T09:15:00Z'
  },
  {
    id: 3,
    type: 'success',
    message: 'Backup completed successfully',
    timestamp: '2024-01-20T08:00:00Z'
  }
];

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-navy-800 to-navy-900 bg-clip-text text-transparent">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">System overview and user management</p>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-navy-800">{mockStats.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{mockStats.newUsersToday} today
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-navy-500 to-navy-600">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-navy-800">{mockStats.activeUsers.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round((mockStats.activeUsers / mockStats.totalUsers) * 100)}% of total
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600">
                    <UserCheck className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Notes</p>
                    <p className="text-2xl font-bold text-navy-800">{mockStats.totalNotes.toLocaleString()}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{mockStats.notesCreatedToday} today
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-gray-500 to-gray-600">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">System Health</p>
                    <p className="text-2xl font-bold text-navy-800">{mockStats.systemHealth}%</p>
                    <div className="mt-2">
                      <Progress value={mockStats.systemHealth} className="h-2" />
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-gold-600 to-gold-500">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Users */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-navy-800">
                    <Users className="h-5 w-5 mr-2 text-gold-600" />
                    Recent Users
                  </CardTitle>
                  <CardDescription>
                    Latest user registrations and activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-navy-50 to-gold-50/30 rounded-lg border border-navy-200/30"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-accent text-accent-foreground">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-navy-800">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-xs text-gray-500">{user.university}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={user.status === 'active' ? 'default' : 'secondary'}
                            className={user.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {user.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{user.notesCount} notes</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* System Alerts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-navy-800">
                    <AlertTriangle className="h-5 w-5 mr-2 text-gold-600" />
                    System Alerts
                  </CardTitle>
                  <CardDescription>
                    Important system notifications and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemAlerts.map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className={`p-3 rounded-lg border-l-4 ${
                          alert.type === 'warning' 
                            ? 'bg-orange-50 border-orange-400' 
                            : alert.type === 'success'
                            ? 'bg-green-50 border-green-400'
                            : 'bg-blue-50 border-blue-400'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              alert.type === 'warning' 
                                ? 'text-orange-800' 
                                : alert.type === 'success'
                                ? 'text-green-800'
                                : 'text-blue-800'
                            }`}>
                              {alert.message}
                            </p>
                            <p className="text-xs text-navy-500 mt-1 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(alert.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <Badge 
                            variant="outline"
                            className={
                              alert.type === 'warning' 
                                ? 'border-orange-400 text-orange-600' 
                                : alert.type === 'success'
                                ? 'border-green-400 text-green-600'
                                : 'border-blue-400 text-blue-600'
                            }
                          >
                            {alert.type}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-accent" />
                  Platform Statistics
                </CardTitle>
                <CardDescription>
                  Overview of platform usage and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-navy-950 mb-2">
                      {mockStats.sharedNotes.toLocaleString()}
                    </div>
                    <div className="text-sm text-navy-600">Shared Notes</div>
                    <div className="text-xs text-navy-500 mt-1">
                      {Math.round((mockStats.sharedNotes / mockStats.totalNotes) * 100)}% of all notes
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-navy-950 mb-2">
                      {Math.round(mockStats.totalNotes / mockStats.activeUsers)}
                    </div>
                    <div className="text-sm text-navy-600">Notes per Active User</div>
                    <div className="text-xs text-navy-500 mt-1">
                      Average engagement metric
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-navy-950 mb-2">
                      {Math.round((mockStats.activeUsers / mockStats.totalUsers) * 100)}%
                    </div>
                    <div className="text-sm text-navy-600">User Retention</div>
                    <div className="text-xs text-navy-500 mt-1">
                      Active vs total users
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
