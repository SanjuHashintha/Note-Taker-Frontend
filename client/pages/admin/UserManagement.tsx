import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/AdminLayout";
import { fetchWithAuth } from "@/utils/api";

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  role: "Admin" | "Student";
  profilePic?: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchWithAuth("http://localhost:4000/api/users");

        if (data?.status === 200) {
          const usersData: User[] = data.payload.map((u: any) => ({
            _id: u._id,
            username: u.username,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            university: u.university,
            role: u.role === "admin" ? "Admin" : "Student",
            notesCount: u.notesCount || 0,
            sharedCount: u.sharedCount || 0,
          }));
          setUsers(usersData);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === "Admin").length;
  const activeUsers = totalUsers; // all active for now

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage users, roles, and permissions
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          <Card className="bg-white/90 shadow-lg">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-navy-800">
                    {totalUsers}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-r from-navy-500 to-navy-600">
                  <Users className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 shadow-lg">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Users
                  </p>
                  <p className="text-2xl font-bold text-navy-800">
                    {activeUsers}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600">
                  <Users className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 shadow-lg">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Admins</p>
                  <p className="text-2xl font-bold text-navy-800">
                    {adminCount}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-r from-gray-500 to-gray-600">
                  <Shield className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 mb-4"
        >
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Student">Student</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-white/90 shadow-lg">
            <CardContent className="p-0">
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-3">User</th>
                    <th className="text-left p-3">University</th>
                    <th className="text-left p-3">Role</th>
                    <th className="text-left p-3">Notes</th>
                    <th className="text-left p-3">Shared</th>
                    {/* <th className="text-left p-3">Activity</th> */}
                    {/* <th className="text-right p-3">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="flex items-center p-3">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>{`${user.firstName[0]}${user.lastName[0]}`}</AvatarFallback>
                        </Avatar>
                        <span>
                          {user.firstName} {user.lastName}
                        </span>
                      </td>
                      <td className="p-3">{user.university}</td>
                      <td className="p-3">
                        <Badge
                          variant={
                            user.role === "Admin" ? "default" : "secondary"
                          }
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-3">0</td> {/* notesCount placeholder */}
                      <td className="p-3">0</td> {/* sharedCount placeholder */}
                      {/* <td className="p-3">Activity</td> */}
                      {/* <td className="p-3 text-right">Actions</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
