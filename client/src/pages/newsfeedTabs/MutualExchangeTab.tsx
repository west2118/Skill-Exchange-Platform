import { ErrorComponent } from "@/components/app/ErrorComponent";
import LoadingSpinner from "@/components/app/LoadingSpinner";
import MutualExchangeCard from "@/components/app/MutualExchangeCard";
import { NoDataCard } from "@/components/app/NoDataCard";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchData from "@/hooks/useFetchData";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";

const MutualExchangeTab = () => {
  const currentUserID = useAppSelector((state) => state.user.currentUserId);
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, loading, error } = useFetchData<any[]>(
    currentUserID ? `http://localhost:8080/api/user-exchange/${currentUserID}` : "",
    [refreshKey]
  );

  const handleAfterPropose = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <TabsContent value="mutual">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorComponent message={error} />
      ) : data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((exchange: any) => (
            <MutualExchangeCard
              key={exchange._id}
              exchange={exchange}
              onRefresh={handleAfterPropose}
            />
          ))}
        </div>
      ) : data && data.length === 0 ? (
        <NoDataCard variant="mutual-exchanges" />
      ) : null}
    </TabsContent>
  );
};

export default MutualExchangeTab;
