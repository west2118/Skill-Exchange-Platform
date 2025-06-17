import ActiveDealCard from "@/components/app/ActiveDealCard";
import { CardSkeletonLoading } from "@/components/app/CardSkeletonLoading";
import { ErrorComponent } from "@/components/app/ErrorComponent";
import { TabsContent } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchData from "@/hooks/useFetchData";

const ActiveDealTab = () => {
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserID = useAppSelector((state) => state.user.currentUserId);
  const { data, loading, error } = useFetchData<[]>(
    `http://localhost:8080/api/deal/${currentUserID}`,
    token
  );

  if (loading)
    return <CardSkeletonLoading count={data?.length || 3} tabValue="nearby" />;
  if (error) return <ErrorComponent message={error} />;

  return (
    <TabsContent value="active" className="space-y-4">
      {data?.map((active: any) => (
        <ActiveDealCard key={active._id} active={active} />
      ))}
    </TabsContent>
  );
};

export default ActiveDealTab;
