import MatchedPostCard from "@/components/app/MatchedPostCard";
import { useAppSelector } from "@/hooks/useAppSelector";
import { privateApi } from "@/utils/axios";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MatchedPost = () => {
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserID = useAppSelector((state) => state.user.currentUserId);
  const [matchedExchanges, setMatchedExchanges] = useState<string[]>([]);

  useEffect(() => {
    if (!currentUserID || !token) return;

    const fetchData = async () => {
      try {
        const response = await privateApi.get(
          `http://localhost:8080/api/user-match/${currentUserID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Matched: ", response?.data);

        setMatchedExchanges(response?.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchData();
  }, [currentUserID, token]);

  return (
    <TabsContent value="skills">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matchedExchanges.map((match: any) => (
          <MatchedPostCard match={match} />
        ))}
      </div>
    </TabsContent>
  );
};

export default MatchedPost;
