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
import { useEffect, useRef, useState } from "react";
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

const ChatMessages = ({ onRefresh }: { onRefresh: () => void }) => {
  const { id: otherUserId } = useParams();
  const currentUserUid = useAppSelector((state) => state.user.currentUserUid);
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const token = useAppSelector((state) => state.user.currentUserToken);
  const deals = useAppSelector((state) => state.deal.deals);
  const users = useAppSelector((state) => state.user.users);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const otherUser = users.find((user: any) => user.uid === otherUserId);

  const deal = deals.find(
    (deal) =>
      deal.status !== "Completed" &&
      deal.status !== "Cancelled" &&
      ((deal.proposerId === currentUserId &&
        deal.receiverId === otherUser?._id) ||
        (deal.proposerId === otherUser?._id &&
          deal.receiverId === currentUserId))
  );

  const yourSkill =
    deal?.receiverId === currentUserId ? deal?.skillOffer : deal?.skillSeek;

  const otherSkill =
    deal?.receiverId === currentUserId ? deal?.skillSeek : deal?.skillOffer;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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

      onRefresh();
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
            <AvatarFallback>{`${otherUser?.firstName.charAt(
              0
            )}${otherUser?.lastName.charAt(0)}`}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{`${otherUser?.firstName} ${otherUser?.lastName}`}</CardTitle>
            {deal && (
              <CardDescription>
                your {yourSkill} ↔ {otherSkill}
              </CardDescription>
            )}
          </div>
          {deal && <Badge className="ml-auto">{deal?.status}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div
          ref={scrollRef}
          className="space-y-6 overflow-y-auto min-h-[500px] max-h-[500px]">
          {/* Message 1 */}
          {messages?.map((item) => (
            <div
              key={item._id}
              className={`flex ${
                item.senderId === currentUserUid ? "justify-end" : ""
              } space-x-3 px-2`}>
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
          ))}
        </div>
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
