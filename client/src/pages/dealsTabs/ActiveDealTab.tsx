import ActiveDealCard from "@/components/app/ActiveDealCard";
import { CardSkeletonLoading } from "@/components/app/CardSkeletonLoading";
import { ErrorComponent } from "@/components/app/ErrorComponent";
import LoadingSpinner from "@/components/app/LoadingSpinner";
import { SessionModal } from "@/components/app/SessionModal";
import { TabsContent } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";

const ActiveDealTab = () => {
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserID = useAppSelector((state) => state.user.currentUserId);
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, loading, error } = useFetchData<[]>(
    `http://localhost:8080/api/deal/${currentUserID}`,
    token,
    [refreshKey]
  );

  const handleAfterPropose = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorComponent message={error} />;

  return (
    <TabsContent value="active" className="space-y-4">
      {data?.map((active: any) => (
        <ActiveDealCard
          key={active._id}
          active={active}
          onRefresh={handleAfterPropose}
        />
      ))}
    </TabsContent>
  );
};

export default ActiveDealTab;
