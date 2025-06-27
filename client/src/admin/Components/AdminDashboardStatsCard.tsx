import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useAppSelector } from "@/hooks/useAppSelector";

const AdminDashboardStatsCard = () => {
  const users = useAppSelector((state) => state.user.users);
  const exchanges = useAppSelector((state) => state.exchange.exchanges);
  const posts = useAppSelector((state) => state.post.posts);
  const deals = useAppSelector((state) => state.deal.deals);

  const totalUsers = users.filter((user: any) => user?.isAdmin === false);
  const completedExchanges = exchanges.filter(
    (exchange: any) => exchange?.status === "Exchanged"
  );
  const completedDeals = deals.filter(
    (deal: any) => deal?.status === "Completed"
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-4xl">{totalUsers?.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-500">+12% from last month</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Completed Exchanges</CardDescription>
          <CardTitle className="text-4xl">
            {completedExchanges?.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-500">+8% from last month</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Posts</CardDescription>
          <CardTitle className="text-4xl">{posts?.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-500">-3% from last week</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Completed Deals</CardDescription>
          <CardTitle className="text-4xl">{completedDeals.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-500">5 awaiting review</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardStatsCard;
