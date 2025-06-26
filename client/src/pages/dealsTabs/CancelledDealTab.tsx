import CancelledDealCard from "@/components/app/CancelledDealCard";
import { TabsContent } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/useAppSelector";
import React from "react";

const CancelledDealTab = () => {
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const deals = useAppSelector((state) => state.deal.deals);

  const userDeals = deals.filter(
    (deal) =>
      (deal.proposerId === currentUserId ||
        deal.receiverId === currentUserId) &&
      deal.status === "Cancelled"
  );

  return (
    <TabsContent value="cancelled" className="space-y-4">
      {userDeals?.map((deal: any) => (
        <CancelledDealCard key={deal._id} deal={deal} />
      ))}
    </TabsContent>
  );
};

export default CancelledDealTab;
