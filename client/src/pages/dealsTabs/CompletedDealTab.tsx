import CompletedDealCard from "@/components/app/CompletedDealCard";
import { NoDataCard } from "@/components/app/NoDataCard";
import { useAppSelector } from "@/hooks/useAppSelector";
import { TabsContent } from "@radix-ui/react-tabs";

const CompletedDealTab = () => {
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const deals = useAppSelector((state) => state.deal.deals);

  const userDeals = deals.filter(
    (deal) =>
      (deal.proposerId === currentUserId ||
        deal.receiverId === currentUserId) &&
      deal.status === "Completed"
  );

  if (userDeals && userDeals.length === 0) {
    return <NoDataCard variant="completed-deals" />;
  }

  return (
    <TabsContent value="completed" className="space-y-4">
      {userDeals?.map((deal: any) => (
        <CompletedDealCard key={deal._id} deal={deal} />
      ))}
    </TabsContent>
  );
};

export default CompletedDealTab;
