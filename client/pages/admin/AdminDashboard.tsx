import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  TrendingUp,
  UserCheck,
  Activity,
  BarChart3,
  Clock,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AdminLayout from "@/components/AdminLayout";
import { fetchWithAuth } from "@/utils/api";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [totalNotes, setTotalNotes] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userData = await fetchWithAuth("http://localhost:4000/api/users");
        if (userData?.status === 200) {
          const users = userData.payload;
          setTotalUsers(users.length);
          setActiveUsers(
            users.filter((u: any) => u.status === "active").length
          );
          const recent = users
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 5)
            .map((u: any) => ({
              id: u._id,
              name: u.firstName + " " + u.lastName,
              email: u.email,
              university: u.university,
              joinedDate: new Date(u.createdAt).toLocaleDateString(),
              status: u.status || "active",
              notesCount: u.notesCount || 0,
            }));
          setRecentUsers(recent);
        }

        const notesData = await fetchWithAuth(
          "http://localhost:4000/api/notes"
        );
        if (notesData?.status === 200) {
          setTotalNotes(
            notesData.payload.totalNotes || notesData.payload.notes.length
          );
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const systemHealth = 98;
  const notesCreatedToday = 0;
  const newUsersToday = 0;

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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-navy-800 to-navy-900 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              System overview and user management
            </p>
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
                    <p className="text-sm font-medium text-gray-600">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-navy-800">
                      {totalUsers.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />+{newUsersToday}{" "}
                      today
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
                    <p className="text-sm font-medium text-gray-600">
                      Active Users
                    </p>
                    <p className="text-2xl font-bold text-navy-800">
                      {activeUsers.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round((activeUsers / totalUsers) * 100) || 0}% of
                      total
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
                    <p className="text-sm font-medium text-gray-600">
                      Total Notes
                    </p>
                    <p className="text-2xl font-bold text-navy-800">
                      {totalNotes.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />+
                      {notesCreatedToday} today
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
                    <p className="text-sm font-medium text-gray-600">
                      System Health
                    </p>
                    <p className="text-2xl font-bold text-navy-800">
                      {systemHealth}%
                    </p>
                    <div className="mt-2">
                      <Progress value={systemHealth} className="h-2" />
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-gold-600 to-gold-500">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

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
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-navy-800">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            {user.university}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            user.status === "active" ? "default" : "secondary"
                          }
                          className={
                            user.status === "active"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {user.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {user.notesCount} notes
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
