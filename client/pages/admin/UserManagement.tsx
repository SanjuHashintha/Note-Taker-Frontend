import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal,
  UserCheck,
  UserX,
  Shield,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import AdminLayout from '@/components/AdminLayout';

interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  profilePic?: string;
  // Optional frontend-only fields for UI
  role?: 'Student' | 'Admin';
  status?: 'active' | 'inactive' | 'suspended';
  joinedDate?: string;
  lastLogin?: string;
  notesCount?: number;
  sharedCount?: number;
}

const mockUsers: User[] = [
  {
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@university.edu',
    university: 'Stanford University',
    profilePic: 'JD',
    role: 'Student',
    status: 'active',
    joinedDate: '2024-01-01',
    lastLogin: '2024-01-20',
    notesCount: 45,
    sharedCount: 12
  },
  {
    username: 'sarahjohnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@university.edu',
    university: 'MIT',
    profilePic: 'SJ',
    role: 'Student',
    status: 'active',
    joinedDate: '2024-01-05',
    lastLogin: '2024-01-19',
    notesCount: 32,
    sharedCount: 8
  },
  {
    username: 'mikechen',
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike@university.edu',
    university: 'Harvard University',
    profilePic: 'MC',
    role: 'Admin',
    status: 'active',
    joinedDate: '2023-12-15',
    lastLogin: '2024-01-20',
    notesCount: 18,
    sharedCount: 25
  },
  {
    username: 'emilydavis',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily@university.edu',
    university: 'Yale University',
    profilePic: 'ED',
    role: 'Student',
    status: 'inactive',
    joinedDate: '2024-01-10',
    lastLogin: '2024-01-15',
    notesCount: 7,
    sharedCount: 2
  },
  {
    username: 'alexrodriguez',
    firstName: 'Alex',
    lastName: 'Rodriguez',
    email: 'alex@university.edu',
    university: 'Princeton University',
    profilePic: 'AR',
    role: 'Student',
    status: 'suspended',
    joinedDate: '2023-12-20',
    lastLogin: '2024-01-12',
    notesCount: 23,
    sharedCount: 5
  }
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.university.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(prev => prev.filter(u => u.username !== userToDelete.username));
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleStatusChange = (username: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setUsers(prev => prev.map(user =>
      user.username === username ? { ...user, status: newStatus } : user
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
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
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-2">Manage users, roles, and permissions</p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
          >
            <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-navy-800">{users.length}</p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-navy-500 to-navy-600">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-navy-800">
                      {users.filter(u => u.status === 'active').length}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600">
                    <UserCheck className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Admins</p>
                    <p className="text-2xl font-bold text-navy-800">
                      {users.filter(u => u.role === 'Admin').length}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-gray-500 to-gray-600">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Suspended</p>
                    <p className="text-2xl font-bold text-navy-800">
                      {users.filter(u => u.status === 'suspended').length}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-red-500 to-red-600">
                    <UserX className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-white border-navy-200 focus:border-accent focus:ring-accent"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 h-12 border-navy-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40 h-12 border-navy-200">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-navy-300/30 shadow-lg">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>University</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.username}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index }}
                        className="hover:bg-navy-50/50"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                                {user.profilePic || `${user.firstName[0]}${user.lastName[0]}`}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-navy-800">{user.firstName} {user.lastName}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">{user.university}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.role === 'Admin' ? 'default' : 'secondary'}
                            className={user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : ''}
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={getStatusColor(user.status)}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p className="text-navy-800">{user.notesCount} notes</p>
                            <p className="text-gray-600">{user.sharedCount} shared</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">{user.joinedDate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewUser(user)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Details Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>User Details</DialogTitle>
                <DialogDescription>
                  Complete information about {`${selectedUser?.firstName} ${selectedUser?.lastName}`}
                </DialogDescription>
              </DialogHeader>
              {selectedUser && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-accent text-accent-foreground text-lg">
                        {`${selectedUser.firstName.charAt(0)}${selectedUser.lastName.charAt(0)}`}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-950">{`${selectedUser.firstName} ${selectedUser.lastName}`}</h3>
                      <p className="text-navy-600">{selectedUser.email}</p>
                      <Badge className={`mt-1 ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-navy-700">University</p>
                      <p className="text-navy-600">{selectedUser.university}</p>
                    </div>
                    <div>
                      <p className="font-medium text-navy-700">Role</p>
                      <p className="text-navy-600">{selectedUser.role}</p>
                    </div>
                    <div>
                      <p className="font-medium text-navy-700">Joined Date</p>
                      <p className="text-navy-600">{selectedUser.joinedDate}</p>
                    </div>
                    <div>
                      <p className="font-medium text-navy-700">Last Login</p>
                      <p className="text-navy-600">{selectedUser.lastLogin}</p>
                    </div>
                    <div>
                      <p className="font-medium text-navy-700">Notes Created</p>
                      <p className="text-navy-600">{selectedUser.notesCount}</p>
                    </div>
                    <div>
                      <p className="font-medium text-navy-700">Notes Shared</p>
                      <p className="text-navy-600">{selectedUser.sharedCount}</p>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete User</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {`${userToDelete?.firstName} ${userToDelete?.lastName}`}? This action cannot be undone.
                  All their notes and data will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmDeleteUser}
                  className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                >
                  Delete User
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </AdminLayout>
  );
}
