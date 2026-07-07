import ActiveDealCard from "@/components/app/ActiveDealCard";
import { ErrorComponent } from "@/components/app/ErrorComponent";
import LoadingSpinner from "@/components/app/LoadingSpinner";
import { NoDataCard } from "@/components/app/NoDataCard";
import { TabsContent } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";

const ActiveDealTab = () => {
  const currentUserID = useAppSelector((state) => state.user.currentUserId);
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, loading, error } = useFetchData<any[]>(
    currentUserID ? `http://localhost:8080/api/deal/${currentUserID}` : "", [refreshKey]
  );

  const handleAfterPropose = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <TabsContent value="active" className="space-y-4">
      {loading ? (
        <LoadingSpinner />
      ) : data && error ? (
        <ErrorComponent message={error} />
      ) : data && data.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((active: any) => (
            <ActiveDealCard
              key={active._id}
              active={active}
              onRefresh={handleAfterPropose}
            />
          ))}
        </div>
      ) : data && data.length === 0 ? (
        <NoDataCard variant="active-deals" />
      ) : null}
    </TabsContent>
  );
};

export default ActiveDealTab;
