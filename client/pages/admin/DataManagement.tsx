import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Download, 
  Upload,
  Trash2,
  RefreshCw,
  HardDrive,
  FileText,
  Users,
  Share2,
  Archive,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AdminLayout from '@/components/AdminLayout';

// Mock data for demonstration
const mockDatabaseStats = {
  totalSize: '2.4 GB',
  users: { count: 1247, size: '125 MB' },
  notes: { count: 15673, size: '1.8 GB' },
  attachments: { count: 3421, size: '485 MB' },
  categories: { count: 87, size: '2.1 MB' },
  tags: { count: 234, size: '1.2 MB' }
};

const mockBackups = [
  {
    id: 1,
    name: 'daily_backup_2024-01-20.sql',
    date: '2024-01-20 02:00:00',
    size: '245 MB',
    type: 'Automatic',
    status: 'completed'
  },
  {
    id: 2,
    name: 'manual_backup_2024-01-19.sql',
    date: '2024-01-19 14:30:00',
    size: '243 MB',
    type: 'Manual',
    status: 'completed'
  },
  {
    id: 3,
    name: 'daily_backup_2024-01-19.sql',
    date: '2024-01-19 02:00:00',
    size: '241 MB',
    type: 'Automatic',
    status: 'completed'
  },
  {
    id: 4,
    name: 'daily_backup_2024-01-18.sql',
    date: '2024-01-18 02:00:00',
    size: '239 MB',
    type: 'Automatic',
    status: 'failed'
  }
];

const mockDataLogs = [
  {
    id: 1,
    action: 'User Registration',
    table: 'users',
    user: 'system',
    timestamp: '2024-01-20 10:30:00',
    details: 'New user registered: john.doe@university.edu'
  },
  {
    id: 2,
    action: 'Note Created',
    table: 'notes',
    user: 'john.doe',
    timestamp: '2024-01-20 10:25:00',
    details: 'Created note: Advanced Calculus - Integration'
  },
  {
    id: 3,
    action: 'Data Export',
    table: 'users',
    user: 'admin',
    timestamp: '2024-01-20 09:15:00',
    details: 'Exported user data (CSV format)'
  },
  {
    id: 4,
    action: 'Note Deleted',
    table: 'notes',
    user: 'admin',
    timestamp: '2024-01-20 08:45:00',
    details: 'Deleted flagged note: ID 1234'
  }
];

export default function DataManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedBackup, setSelectedBackup] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredBackups = mockBackups.filter(backup => {
    const matchesSearch = backup.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || backup.type.toLowerCase() === filterType;
    return matchesSearch && matchesType;
  });

  const handleCreateBackup = async () => {
    setIsProcessing(true);
    // Simulate backup creation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    alert('Backup created successfully!');
  };

  const handleRestoreBackup = async (backup: any) => {
    setIsProcessing(true);
    // Simulate restore process
    await new Promise(resolve => setTimeout(resolve, 5000));
    setIsProcessing(false);
    alert(`Database restored from ${backup.name}`);
  };

  const handleDeleteBackup = async (backupId: number) => {
    // Simulate backup deletion
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Backup deleted successfully!');
  };

  const handleExportData = (type: string) => {
    // Simulate data export
    const data = `${type}_export_${new Date().toISOString().split('T')[0]}.csv`;
    alert(`Exporting ${type} data as ${data}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
            <h1 className="text-3xl font-bold text-navy-950">Data Management</h1>
            <p className="text-navy-600 mt-2">Manage system data, backups, and database operations</p>
          </motion.div>

          {/* Database Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">Total Size</p>
                    <p className="text-xl font-bold text-navy-950">{mockDatabaseStats.totalSize}</p>
                  </div>
                  <div className="p-2 rounded-full bg-blue-500">
                    <HardDrive className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">Users</p>
                    <p className="text-xl font-bold text-navy-950">{mockDatabaseStats.users.count.toLocaleString()}</p>
                    <p className="text-xs text-navy-500">{mockDatabaseStats.users.size}</p>
                  </div>
                  <div className="p-2 rounded-full bg-green-500">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">Notes</p>
                    <p className="text-xl font-bold text-navy-950">{mockDatabaseStats.notes.count.toLocaleString()}</p>
                    <p className="text-xs text-navy-500">{mockDatabaseStats.notes.size}</p>
                  </div>
                  <div className="p-2 rounded-full bg-purple-500">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">Attachments</p>
                    <p className="text-xl font-bold text-navy-950">{mockDatabaseStats.attachments.count.toLocaleString()}</p>
                    <p className="text-xs text-navy-500">{mockDatabaseStats.attachments.size}</p>
                  </div>
                  <div className="p-2 rounded-full bg-orange-500">
                    <Archive className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">Categories</p>
                    <p className="text-xl font-bold text-navy-950">{mockDatabaseStats.categories.count}</p>
                    <p className="text-xs text-navy-500">{mockDatabaseStats.categories.size}</p>
                  </div>
                  <div className="p-2 rounded-full bg-pink-500">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-600">Tags</p>
                    <p className="text-xl font-bold text-navy-950">{mockDatabaseStats.tags.count}</p>
                    <p className="text-xs text-navy-500">{mockDatabaseStats.tags.size}</p>
                  </div>
                  <div className="p-2 rounded-full bg-cyan-500">
                    <Share2 className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Tabs defaultValue="backups" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="backups">Backups</TabsTrigger>
              <TabsTrigger value="exports">Data Export</TabsTrigger>
              <TabsTrigger value="logs">Activity Logs</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>

            {/* Backups Tab */}
            <TabsContent value="backups">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <Database className="h-5 w-5 mr-2 text-accent" />
                          Database Backups
                        </CardTitle>
                        <CardDescription>
                          Manage database backups and restoration
                        </CardDescription>
                      </div>
                      <Button
                        onClick={handleCreateBackup}
                        disabled={isProcessing}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Create Backup
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
                        <Input
                          placeholder="Search backups..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Backups Table */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Backup Name</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBackups.map((backup) => (
                          <TableRow key={backup.id}>
                            <TableCell className="font-medium">{backup.name}</TableCell>
                            <TableCell>{backup.date}</TableCell>
                            <TableCell>{backup.size}</TableCell>
                            <TableCell>
                              <Badge variant={backup.type === 'Automatic' ? 'default' : 'secondary'}>
                                {backup.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant="secondary" 
                                className={getStatusColor(backup.status)}
                              >
                                {backup.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => {
                                    setSelectedBackup(backup);
                                    setIsDetailsOpen(true);
                                  }}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  {backup.status === 'completed' && (
                                    <DropdownMenuItem onClick={() => handleRestoreBackup(backup)}>
                                      <Upload className="h-4 w-4 mr-2" />
                                      Restore
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteBackup(backup.id)}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Data Export Tab */}
            <TabsContent value="exports">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Download className="h-5 w-5 mr-2 text-accent" />
                      Data Export
                    </CardTitle>
                    <CardDescription>
                      Export system data in various formats
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { title: 'Users Data', description: 'Export all user information', icon: Users, count: '1,247 users' },
                        { title: 'Notes Data', description: 'Export all notes and content', icon: FileText, count: '15,673 notes' },
                        { title: 'Categories', description: 'Export category structure', icon: BarChart3, count: '87 categories' },
                        { title: 'Sharing Data', description: 'Export sharing relationships', icon: Share2, count: '3,421 shares' }
                      ].map((item, index) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <Card className="p-4 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className="p-2 rounded-full bg-accent/10">
                                  <item.icon className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-navy-950">{item.title}</h3>
                                  <p className="text-sm text-navy-600">{item.description}</p>
                                  <p className="text-xs text-navy-500 mt-1">{item.count}</p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleExportData(item.title.toLowerCase().replace(' data', '').replace(' ', '_'))}
                                >
                                  CSV
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleExportData(item.title.toLowerCase().replace(' data', '').replace(' ', '_'))}
                                >
                                  JSON
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-navy-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-navy-600" />
                        <span className="font-medium text-navy-700">Export Guidelines</span>
                      </div>
                      <ul className="text-sm text-navy-600 space-y-1">
                        <li>• Exported data includes all visible fields and metadata</li>
                        <li>• CSV format is suitable for spreadsheet applications</li>
                        <li>• JSON format preserves data relationships and structure</li>
                        <li>• Large exports may take several minutes to complete</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Activity Logs Tab */}
            <TabsContent value="logs">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-accent" />
                      Activity Logs
                    </CardTitle>
                    <CardDescription>
                      Monitor data operations and system activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Action</TableHead>
                          <TableHead>Table</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockDataLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="font-medium">{log.action}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{log.table}</Badge>
                            </TableCell>
                            <TableCell>{log.user}</TableCell>
                            <TableCell>{log.timestamp}</TableCell>
                            <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Maintenance Tab */}
            <TabsContent value="maintenance">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <RefreshCw className="h-5 w-5 mr-2 text-accent" />
                        Database Optimization
                      </CardTitle>
                      <CardDescription>
                        Optimize database performance and clean up data
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Optimize Tables
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clean Orphaned Data
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Database className="h-4 w-4 mr-2" />
                        Rebuild Indexes
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <HardDrive className="h-5 w-5 mr-2 text-accent" />
                        Storage Management
                      </CardTitle>
                      <CardDescription>
                        Monitor and manage system storage usage
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Database Storage</span>
                          <span>2.4 GB / 10 GB</span>
                        </div>
                        <Progress value={24} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>File Storage</span>
                          <span>485 MB / 5 GB</span>
                        </div>
                        <Progress value={9.7} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Backup Storage</span>
                          <span>1.2 GB / 2 GB</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Backup Details Dialog */}
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Backup Details</DialogTitle>
                <DialogDescription>
                  Detailed information about the selected backup
                </DialogDescription>
              </DialogHeader>
              {selectedBackup && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-navy-700">Name</p>
                      <p className="text-navy-600">{selectedBackup.name}</p>
                    </div>
                    <div>
                      <p className="font-medium text-navy-700">Size</p>
                      <p className="text-navy-600">{selectedBackup.size}</p>
                    </div>
                    <div>
                      <p className="font-medium text-navy-700">Type</p>
                      <p className="text-navy-600">{selectedBackup.type}</p>
                    </div>
                    <div>
                      <p className="font-medium text-navy-700">Status</p>
                      <Badge className={getStatusColor(selectedBackup.status)}>
                        {selectedBackup.status}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <p className="font-medium text-navy-700">Created</p>
                      <p className="text-navy-600">{selectedBackup.date}</p>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AdminLayout>
  );
}
