import { ErrorComponent } from "@/components/app/ErrorComponent";
import LoadingSpinner from "@/components/app/LoadingSpinner";
import MutualExchangeCard from "@/components/app/MutualExchangeCard";
import { NoDataCard } from "@/components/app/NoDataCard";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchData from "@/hooks/useFetchData";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";

const MutualExchangeTab = () => {
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserID = useAppSelector((state) => state.user.currentUserId);
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, loading, error } = useFetchData<[]>(
    `http://localhost:8080/api/user-exchange/${currentUserID}`,
    token,
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
      ) : (
        data && data.length === 0 && <NoDataCard variant="mutual-exchanges" />
      )}
    </TabsContent>
  );
};

export default MutualExchangeTab;
