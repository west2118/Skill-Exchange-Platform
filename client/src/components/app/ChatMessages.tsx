import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { privateApi } from "@/utils/axios";
import { useAppSelector } from "@/hooks/useAppSelector";
import { toast } from "react-toastify";
import { connectSocket, getSocket } from "@/utils/socket";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

const formatDateWithTime = (isoString: string) => {
  const date = new Date(isoString);
  return format(date, "MMMM d, h:mm a");
};

const ChatMessages = () => {
  const { id: otherUserId } = useParams();
  const currentUserUid = useAppSelector((state) => state.user.currentUserUid);
  const token = useAppSelector((state) => state.user.currentUserToken);
  const users = useAppSelector((state) => state.user.users);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!token) return;

      const roomId = [currentUserUid, otherUserId].sort().join("_");

      try {
        const response = await privateApi.get(
          `http://localhost:8080/api/messages/${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessages(response?.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchMessages();
  }, [currentUserUid, otherUserId, token]);

  useEffect(() => {
    if (!token) return;

    connectSocket(token);
    const socket = getSocket();

    if (!socket) return;

    const handleNewMessage = (message: any) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage); // Cleanup on unmount
    };
  }, [token]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();

    const user = auth.currentUser;
    const currentToken = await user?.getIdToken();

    if (!text) return;

    try {
      const response = await privateApi.post(
        `http://localhost:8080/api/message/${currentUserUid}`,
        { text, receiverId: otherUserId },
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      setMessages((prev) => [...prev, response?.data]);
      setText("");
    } catch (error: any) {
      console.log("❌ Send message error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <Card>
      <CardHeader className="border-b gap-0">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/avatars/sarah.jpg" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Sarah Johnson</CardTitle>
            <CardDescription>Bike Repair ↔ Spanish</CardDescription>
          </div>
          <Badge className="ml-auto">Pending Confirmation</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Message 1 */}
        {messages?.map((item) => {
          const otherUser = users.find(
            (user: any) =>
              user.uid ===
              (item.senderId === currentUserUid
                ? item.receiverId
                : item.senderId)
          );

          return (
            <div
              key={item._id}
              className={`flex ${
                item.senderId === currentUserUid ? "justify-end" : ""
              } space-x-3`}>
              {item.senderId !== currentUserUid && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/sarah.jpg" />
                  <AvatarFallback>{`${otherUser?.firstName.charAt(
                    0
                  )}${otherUser?.lastName.charAt(0)}`}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <div
                  className={`rounded-lg ${
                    item.senderId === currentUserUid
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100"
                  } p-4`}>
                  <p>{item.text}</p>
                </div>
                <p
                  className={`mt-1 ${
                    item.senderId === currentUserUid
                      ? "justify-start"
                      : "justify-end"
                  } text-xs text-gray-500`}>
                  {formatDateWithTime(item.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="border-t p-4">
        <form
          onSubmit={handleSendMessage}
          className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1"
          />
          <Button className="bg-emerald-600 hover:bg-emerald-700">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatMessages;
