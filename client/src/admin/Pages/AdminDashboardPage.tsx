import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminDashboardStatsCard from "../Components/AdminDashboardStatsCard";
import AdminDashboardCharts from "../Components/AdminDashboardCharts";

export default function AdminDashboardPage() {
  // Fake data for charts

  const skillCategoriesData = [
    { name: "Home/Garden", value: 125 },
    { name: "Languages", value: 90 },
    { name: "Tech", value: 75 },
    { name: "Arts", value: 60 },
    { name: "Other", value: 50 },
  ];

  // Fake data for tables
  const reportedUsers = [
    {
      id: 1,
      name: "user123",
      reports: 3,
      status: "Active",
      lastReport: "2 days ago",
    },
    {
      id: 2,
      name: "skillMaster",
      reports: 5,
      status: "Under Review",
      lastReport: "1 day ago",
    },
    {
      id: 3,
      name: "exchangePro",
      reports: 2,
      status: "Active",
      lastReport: "1 week ago",
    },
    {
      id: 4,
      name: "newbie22",
      reports: 7,
      status: "Suspended",
      lastReport: "3 days ago",
    },
  ];

  const flaggedPosts = [
    {
      id: 1,
      title: "Bike repair for Spanish",
      user: "user123",
      flags: 2,
      reason: "Suspicious contact info",
    },
    {
      id: 2,
      title: "Free guitar lessons",
      user: "musicLover",
      flags: 5,
      reason: "Possible scam",
    },
    {
      id: 3,
      title: "House cleaning",
      user: "cleanFreak",
      flags: 1,
      reason: "Inappropriate content",
    },
  ];

  return (
    <main className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Overview and moderation tools</p>
      </div>

      {/* Stats Cards */}
      <AdminDashboardStatsCard />

      {/* Charts Section */}
      <AdminDashboardCharts />

      {/* Data Tables */}
      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users & Reports</TabsTrigger>
          <TabsTrigger value="posts">Flagged Posts</TabsTrigger>
          <TabsTrigger value="analytics">Community Analytics</TabsTrigger>
        </TabsList>

        {/* Users & Reports Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Reported Users</CardTitle>
              <CardDescription>
                Users with multiple reports or flags
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Reports</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Report</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.reports}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "Active"
                              ? "default"
                              : user.status === "Under Review"
                              ? "secondary"
                              : "destructive"
                          }>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastReport}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Flagged Posts Tab */}
        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>Flagged Posts</CardTitle>
              <CardDescription>
                Posts that have been reported by community members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Post ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Flags</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flaggedPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>{post.id}</TableCell>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{post.user}</TableCell>
                      <TableCell>{post.flags}</TableCell>
                      <TableCell>{post.reason}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Community Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skill Categories</CardTitle>
                <CardDescription>Most popular skill categories</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillCategoriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Summary of community actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Users</p>
                      <p className="text-sm text-gray-600">24 in last 7 days</p>
                    </div>
                    <Badge variant="outline">+12%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Exchanges Started</p>
                      <p className="text-sm text-gray-600">56 in last 7 days</p>
                    </div>
                    <Badge variant="outline">+8%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Reports Submitted</p>
                      <p className="text-sm text-gray-600">18 in last 7 days</p>
                    </div>
                    <Badge variant="outline">-5%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Avg. Rating</p>
                      <p className="text-sm text-gray-600">4.6 out of 5</p>
                    </div>
                    <Badge variant="outline">+0.2</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
