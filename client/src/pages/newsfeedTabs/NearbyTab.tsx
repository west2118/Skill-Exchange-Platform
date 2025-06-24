import { ErrorComponent } from "@/components/app/ErrorComponent";
import LoadingSpinner from "@/components/app/LoadingSpinner";
import NearbyUserCard from "@/components/app/NearbyUserCard";
import { NoDataCard } from "@/components/app/NoDataCard";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchData from "@/hooks/useFetchData";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";

const NearbyTab = () => {
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserID = useAppSelector((state) => state.user.currentUserId);
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, loading, error } = useFetchData<[]>(
    `http://localhost:8080/api/post/${currentUserID}`,
    token,
    [refreshKey]
  );

  const handleAfterPropose = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <TabsContent value="nearby">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorComponent message={error} />
      ) : data && data.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item: any) => (
            <NearbyUserCard
              key={item._id}
              item={item}
              onRefresh={handleAfterPropose}
            />
          ))}
        </div>
      ) : (
        data && data.length === 0 && <NoDataCard variant="nearby-users" />
      )}
    </TabsContent>
  );
};

export default NearbyTab;
