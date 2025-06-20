import { CardSkeletonLoading } from "@/components/app/CardSkeletonLoading";
import { ErrorComponent } from "@/components/app/ErrorComponent";
import { Loading } from "@/components/app/Loading";
import MyPostCard from "@/components/app/MyPostCard";
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

  if (loading)
    return <CardSkeletonLoading count={data?.length || 3} tabValue="my-post" />;
  if (error) return <ErrorComponent message={error} />;

  return (
    <TabsContent value="my-post">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data &&
          data.map((item: any) => <MyPostCard key={item._id} item={item} />)}
      </div>
    </TabsContent>
  );
};

export default MyPostTab;
