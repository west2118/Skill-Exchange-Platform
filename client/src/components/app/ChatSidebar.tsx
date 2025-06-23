import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchData from "@/hooks/useFetchData";
import { ErrorComponent } from "./ErrorComponent";
import LoadingSpinner from "./LoadingSpinner";
import ChatCard from "./ChatCard";

const ChatSidebar = () => {
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const { data, loading, error } = useFetchData<[]>(
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
      <CardContent className="space-y-4 p-0">
        {/* Conversation 1 - Active */}
        {data?.map((user: any) => (
          <ChatCard key={user._id} user={user} />
        ))}
      </CardContent>
    </Card>
  );
};

export default ChatSidebar;
