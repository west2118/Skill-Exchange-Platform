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

export default function AdminDashboardPage() {
  // Fake data for charts
  const userGrowthData = [
    { name: "Jan", users: 120 },
    { name: "Feb", users: 210 },
    { name: "Mar", users: 180 },
    { name: "Apr", users: 300 },
    { name: "May", users: 450 },
    { name: "Jun", users: 600 },
  ];

  const exchangeData = [
    { name: "Completed", value: 345 },
    { name: "Pending", value: 120 },
    { name: "Cancelled", value: 45 },
  ];

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

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
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-emerald-600">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="font-bold text-emerald-600">LocalLoop Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Admin Settings</Button>
            <Button variant="outline">Log Out</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-64 border-r bg-white md:block">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Moderation
              </h2>
              <div className="space-y-1">
                <Button variant="secondary" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Manage Users & Reports
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Flagged Posts
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2">
                    <line x1="12" y1="20" x2="12" y2="10"></line>
                    <line x1="18" y1="20" x2="18" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="16"></line>
                  </svg>
                  Community Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Area */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Overview and moderation tools</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Users</CardDescription>
                <CardTitle className="text-4xl">1,248</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-500">
                  +12% from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Exchanges</CardDescription>
                <CardTitle className="text-4xl">189</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-500">+8% from last month</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Reports This Week</CardDescription>
                <CardTitle className="text-4xl">24</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-500">-3% from last week</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Flagged Content</CardDescription>
                <CardTitle className="text-4xl">15</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-500">5 awaiting review</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Exchange Status</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={exchangeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }>
                      {exchangeData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

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
                    <CardDescription>
                      Most popular skill categories
                    </CardDescription>
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
                    <CardDescription>
                      Summary of community actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Users</p>
                          <p className="text-sm text-gray-600">
                            24 in last 7 days
                          </p>
                        </div>
                        <Badge variant="outline">+12%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Exchanges Started</p>
                          <p className="text-sm text-gray-600">
                            56 in last 7 days
                          </p>
                        </div>
                        <Badge variant="outline">+8%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Reports Submitted</p>
                          <p className="text-sm text-gray-600">
                            18 in last 7 days
                          </p>
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
      </div>
    </div>
  );
}
