import { CardSkeletonLoading } from "@/components/app/CardSkeletonLoading";
import { ErrorComponent } from "@/components/app/ErrorComponent";
import NearbyUserCard from "@/components/app/NearbyUserCard";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchData from "@/hooks/useFetchData";
import { TabsContent } from "@radix-ui/react-tabs";

const NearbyTab = () => {
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserID = useAppSelector((state) => state.user.currentUserId);
  const { data, loading, error } = useFetchData<[]>(
    `http://localhost:8080/api/post/${currentUserID}`,
    token
  );

  if (loading)
    return <CardSkeletonLoading count={data?.length || 3} tabValue="nearby" />;
  if (error) return <ErrorComponent message={error} />;

  return (
    <TabsContent value="nearby">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data &&
          data.map((item: any) => (
            <NearbyUserCard key={item._id} item={item} />
          ))}
      </div>
    </TabsContent>
  );
};

export default NearbyTab;
