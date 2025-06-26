import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchData from "@/hooks/useFetchData";
import LoadingSpinner from "./LoadingSpinner";
import ChatCard from "./ChatCard";

const ChatSidebar = ({ refreshTrigger }: any) => {
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const { data, loading } = useFetchData<[]>(
    `http://localhost:8080/api/sidebar-messages/${currentUserId}`,
    token
  );

  console.log(data);

  if (loading) return <LoadingSpinner />;

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Your Conversations</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Conversation 1 - Active */}
        {data?.map((user: any) => (
          <ChatCard
            key={user._id}
            user={user}
            refreshTrigger={refreshTrigger}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ChatSidebar;
