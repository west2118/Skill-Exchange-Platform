import MyPostCard from "@/components/app/MyPostCard";
import { useAppSelector } from "@/hooks/useAppSelector";
import { privateApi } from "@/utils/axios";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyPostTab = () => {
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserID = useAppSelector((state) => state.user.currentUserId);
  const [userPosts, setUserPosts] = useState<string[]>([]);

  useEffect(() => {
    if (!currentUserID || !token) return;

    const fetchData = async () => {
      try {
        const response = await privateApi.get(
          `http://localhost:8080/api/user-post/${currentUserID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response?.data);

        setUserPosts(response?.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchData();
  }, [currentUserID, token]);

  return (
    <TabsContent value="my-post">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userPosts.map((item: any) => (
          <MyPostCard key={item._id} item={item} />
        ))}
      </div>
    </TabsContent>
  );
};

export default MyPostTab;
