import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useAppSelector } from "@/hooks/useAppSelector";
import { format } from "date-fns";
import {
  LineChart,
  Line,
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

const allMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

const AdminDashboardCharts = () => {
  const users = useAppSelector((state) => state.user.users);
  const deals = useAppSelector((state) => state.deal.deals);

  const filterAdmins = users.filter((user: any) => user.isAdmin !== true);

  const usersPerMonth: { [key: string]: number } = {};

  filterAdmins.forEach((user: any) => {
    const month = format(new Date(user.createdAt), "MMM");
    usersPerMonth[month] = (usersPerMonth[month] || 0) + 1;
  });

  const userGrowthData = allMonths.map((month) => ({
    name: month,
    users: usersPerMonth[month] || 0,
  }));

  const dealsCount = (status: string) => {
    return deals.filter((deal: any) => deal.status === status);
  };

  const exchangeData = [
    { name: "Completed", value: dealsCount("Completed").length },
    { name: "Pending", value: dealsCount("Upcoming").length },
    { name: "Cancelled", value: dealsCount("Cancelled").length },
  ];

  return (
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
                outerRadius={100}
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
  );
};

export default AdminDashboardCharts;
