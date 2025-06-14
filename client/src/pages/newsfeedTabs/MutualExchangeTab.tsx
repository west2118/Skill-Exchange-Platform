import { Loading } from "@/components/app/Loading";
import MutualExchangeCard from "@/components/app/MutualExchangeCard";
import { useAppSelector } from "@/hooks/useAppSelector";
import { privateApi } from "@/utils/axios";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MutualExchangeTab = () => {
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserID = useAppSelector((state) => state.user.currentUserId);
  const [mutualExchanges, setMutualExchanges] = useState<string[]>([]);

  useEffect(() => {
    if (!currentUserID || !token) return;

    const fetchData = async () => {
      try {
        const response = await privateApi.get(
          `http://localhost:8080/api/user-exchange/${currentUserID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response?.data);

        setMutualExchanges(response?.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchData();
  }, [currentUserID, token]);

  return (
    <TabsContent value="mutual">
      <div className="space-y-4">
        {mutualExchanges.map((exchange: any) => (
          <MutualExchangeCard key={exchange._id} exchange={exchange} />
        ))}
      </div>
    </TabsContent>
  );
};

export default MutualExchangeTab;
