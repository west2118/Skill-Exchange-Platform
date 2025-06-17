import { CardSkeletonLoading } from "@/components/app/CardSkeletonLoading";
import { ErrorComponent } from "@/components/app/ErrorComponent";
import MatchedPostCard from "@/components/app/MatchedPostCard";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchData from "@/hooks/useFetchData";
import { TabsContent } from "@radix-ui/react-tabs";

const MatchedPost = () => {
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserID = useAppSelector((state) => state.user.currentUserId);
  const { data, loading, error } = useFetchData<[]>(
    `http://localhost:8080/api/user-match/${currentUserID}`,
    token
  );

  if (loading)
    return <CardSkeletonLoading count={data?.length || 3} tabValue="skiils" />;
  if (error) return <ErrorComponent message={error} />;

  return (
    <TabsContent value="skills">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data &&
          data.map((match: any) => (
            <MatchedPostCard key={match._id} match={match} />
          ))}
      </div>
    </TabsContent>
  );
};

export default MatchedPost;
