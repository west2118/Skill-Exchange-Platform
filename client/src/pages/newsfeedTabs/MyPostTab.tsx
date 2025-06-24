import { ErrorComponent } from "@/components/app/ErrorComponent";
import LoadingSpinner from "@/components/app/LoadingSpinner";
import MyPostCard from "@/components/app/MyPostCard";
import { NoDataCard } from "@/components/app/NoDataCard";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchData from "@/hooks/useFetchData";
import { TabsContent } from "@radix-ui/react-tabs";

const MyPostTab = () => {
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserID = useAppSelector((state) => state.user.currentUserId);
  const { data, loading, error } = useFetchData<[]>(
    `http://localhost:8080/api/user-post/${currentUserID}`,
    token
  );

  return (
    <TabsContent value="my-post">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorComponent message={error} />
      ) : data && data.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item: any) => (
            <MyPostCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        data && data.length === 0 && <NoDataCard variant="my-posts" />
      )}
    </TabsContent>
  );
};

export default MyPostTab;
