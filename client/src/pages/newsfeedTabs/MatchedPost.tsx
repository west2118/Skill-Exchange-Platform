import { ErrorComponent } from "@/components/app/ErrorComponent";
import LoadingSpinner from "@/components/app/LoadingSpinner";
import MatchedPostCard from "@/components/app/MatchedPostCard";
import { NoDataCard } from "@/components/app/NoDataCard";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchData from "@/hooks/useFetchData";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";

const MatchedPost = () => {
  const currentUserID = useAppSelector((state) => state.user.currentUserId);
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, loading, error } = useFetchData<any[]>(
    currentUserID ? `http://localhost:8080/api/user-match/${currentUserID}` : "",
    [refreshKey]
  );

  const handleAfterPropose = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <TabsContent value="skills">
      {loading ? (
        <LoadingSpinner />
      ) : data && error ? (
        <ErrorComponent message={error} />
      ) : data && data.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((match: any) => (
            <MatchedPostCard
              key={match._id}
              match={match}
              onRefresh={handleAfterPropose}
            />
          ))}
        </div>
      ) : data && data.length === 0 ? (
        <NoDataCard variant="skill-matches" />
      ) : null}
    </TabsContent>
  );
};

export default MatchedPost;
