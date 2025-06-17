import { CardSkeletonLoading } from "@/components/app/CardSkeletonLoading";
import { ErrorComponent } from "@/components/app/ErrorComponent";
import { Loading } from "@/components/app/Loading";
import MutualExchangeCard from "@/components/app/MutualExchangeCard";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchData from "@/hooks/useFetchData";
import { TabsContent } from "@radix-ui/react-tabs";

const MutualExchangeTab = () => {
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserID = useAppSelector((state) => state.user.currentUserId);
  const { data, loading, error } = useFetchData<[]>(
    `http://localhost:8080/api/user-exchange/${currentUserID}`,
    token
  );

  if (loading)
    return <CardSkeletonLoading count={data?.length || 3} tabValue="mutual" />;
  if (error) return <ErrorComponent message={error} />;

  return (
    <TabsContent value="mutual">
      <div className="space-y-4">
        {data &&
          data.map((exchange: any) => (
            <MutualExchangeCard key={exchange._id} exchange={exchange} />
          ))}
      </div>
    </TabsContent>
  );
};

export default MutualExchangeTab;
