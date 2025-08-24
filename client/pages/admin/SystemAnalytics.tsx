import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText,
  Share2,
  Activity,
  Server,
  Database,
  Wifi,
  HardDrive,
  Clock,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/AdminLayout';

// Mock analytics data
const analyticsData = {
  userGrowth: {
    daily: [12, 19, 3, 5, 2, 3, 9, 15, 8, 12, 23, 17, 19, 14, 8],
    weekly: [89, 142, 167, 203, 245],
    monthly: [450, 623, 789, 891, 1247]
  },
  noteCreation: {
    daily: [45, 52, 38, 71, 49, 62, 73, 81, 59, 67, 78, 85, 92, 76, 68],
    weekly: [324, 389, 456, 521, 612],
    monthly: [1234, 1456, 1789, 2134, 2456]
  },
  systemHealth: {
    cpu: 72,
    memory: 68,
    disk: 45,
    network: 89
  },
  topUniversities: [
    { name: 'Stanford University', users: 234, growth: 12 },
    { name: 'MIT', users: 189, growth: 8 },
    { name: 'Harvard University', users: 167, growth: 15 },
    { name: 'Yale University', users: 145, growth: 6 },
    { name: 'Princeton University', users: 123, growth: 9 }
  ],
  recentActivity: [
    { type: 'user_signup', count: 23, timestamp: '2024-01-20T10:30:00Z' },
    { type: 'note_created', count: 156, timestamp: '2024-01-20T10:00:00Z' },
    { type: 'note_shared', count: 45, timestamp: '2024-01-20T09:30:00Z' },
    { type: 'user_login', count: 892, timestamp: '2024-01-20T09:00:00Z' }
  ]
};

export default function SystemAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const getGrowthData = (type: 'userGrowth' | 'noteCreation') => {
    switch (selectedPeriod) {
      case 'day':
        return analyticsData[type].daily;
      case 'week':
        return analyticsData[type].weekly;
      case 'month':
        return analyticsData[type].monthly;
      default:
        return analyticsData[type].weekly;
    }
  };

  const getHealthColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBg = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-navy-950">System Analytics</h1>
              <p className="text-navy-600 mt-2">Platform performance and usage insights</p>
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40 border-navy-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Last 15 Days</SelectItem>
                <SelectItem value="week">Last 5 Weeks</SelectItem>
                <SelectItem value="month">Last 5 Months</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* System Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Server className="h-4 w-4 text-navy-600" />
                    <span className="text-sm font-medium text-navy-600">CPU Usage</span>
                  </div>
                  <span className={`text-sm font-bold ${getHealthColor(analyticsData.systemHealth.cpu)}`}>
                    {analyticsData.systemHealth.cpu}%
                  </span>
                </div>
                <Progress 
                  value={analyticsData.systemHealth.cpu} 
                  className="h-2"
                />
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-navy-600" />
                    <span className="text-sm font-medium text-navy-600">Memory</span>
                  </div>
                  <span className={`text-sm font-bold ${getHealthColor(analyticsData.systemHealth.memory)}`}>
                    {analyticsData.systemHealth.memory}%
                  </span>
                </div>
                <Progress 
                  value={analyticsData.systemHealth.memory} 
                  className="h-2"
                />
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="h-4 w-4 text-navy-600" />
                    <span className="text-sm font-medium text-navy-600">Disk Space</span>
                  </div>
                  <span className={`text-sm font-bold ${getHealthColor(analyticsData.systemHealth.disk)}`}>
                    {analyticsData.systemHealth.disk}%
                  </span>
                </div>
                <Progress 
                  value={analyticsData.systemHealth.disk} 
                  className="h-2"
                />
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-navy-600" />
                    <span className="text-sm font-medium text-navy-600">Network</span>
                  </div>
                  <span className={`text-sm font-bold ${getHealthColor(analyticsData.systemHealth.network)}`}>
                    {analyticsData.systemHealth.network}%
                  </span>
                </div>
                <Progress 
                  value={analyticsData.systemHealth.network} 
                  className="h-2"
                />
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* User Growth Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-accent" />
                    User Growth
                  </CardTitle>
                  <CardDescription>
                    New user registrations over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {getGrowthData('userGrowth').map((value, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
                          style={{ 
                            height: `${(value / Math.max(...getGrowthData('userGrowth'))) * 200}px`,
                            minHeight: '10px'
                          }}
                        />
                        <span className="text-xs text-navy-500 mt-2">{index + 1}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-navy-600">
                      Peak: {Math.max(...getGrowthData('userGrowth'))} users
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Note Creation Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-accent" />
                    Note Creation
                  </CardTitle>
                  <CardDescription>
                    Notes created over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {getGrowthData('noteCreation').map((value, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="bg-green-500 rounded-t w-full transition-all duration-300 hover:bg-green-600"
                          style={{ 
                            height: `${(value / Math.max(...getGrowthData('noteCreation'))) * 200}px`,
                            minHeight: '10px'
                          }}
                        />
                        <span className="text-xs text-navy-500 mt-2">{index + 1}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-navy-600">
                      Peak: {Math.max(...getGrowthData('noteCreation'))} notes
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Universities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-accent" />
                    Top Universities
                  </CardTitle>
                  <CardDescription>
                    Universities with most active users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topUniversities.map((university, index) => (
                      <motion.div
                        key={university.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between p-3 bg-navy-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-navy-950">{university.name}</p>
                            <p className="text-sm text-navy-600">{university.users} users</p>
                          </div>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="bg-green-100 text-green-800"
                        >
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +{university.growth}%
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-accent" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    System activity in the last 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.type}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between p-3 bg-navy-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            activity.type === 'user_signup' ? 'bg-blue-500' :
                            activity.type === 'note_created' ? 'bg-green-500' :
                            activity.type === 'note_shared' ? 'bg-purple-500' :
                            'bg-orange-500'
                          }`} />
                          <div>
                            <p className="font-medium text-navy-950">
                              {activity.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </p>
                            <p className="text-xs text-navy-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(activity.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-navy-950">{activity.count}</p>
                          <p className="text-xs text-navy-500">events</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
