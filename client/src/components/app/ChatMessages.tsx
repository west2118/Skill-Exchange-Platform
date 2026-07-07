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
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const deals = useAppSelector((state) => state.deal.deals);
  const users = useAppSelector((state) => state.user.users);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const otherUser = users.find((user: any) => user._id === otherUserId);

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
      if (!currentUserId) return;

      const roomId = [currentUserId, otherUserId].sort().join("_");

      try {
        const response = await privateApi.get(
          `http://localhost:8080/api/messages/${roomId}`,
          {
            headers: {
            },
          }
        );

        setMessages(response?.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchMessages();
  }, [currentUserId, otherUserId]);

  useEffect(() => {
    if (!currentUserId) return;

    connectSocket();
    const socket = getSocket();

    if (!socket) return;

    const handleNewMessage = (message: any) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage); // Cleanup on unmount
    };
  }, [currentUserId]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();

    if (!text) return;

    try {
      const response = await privateApi.post(
        `http://localhost:8080/api/message/${currentUserId}`,
        { text, receiverId: otherUserId },
        {
          headers: {
          },
        }
      );

      onRefresh();
      setMessages((prev) => [...prev, response?.data]);
      setText("");
    } catch (error: any) {
      console.log("\u274C Send message error:", error);
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
                your {yourSkill} &harr; {otherSkill}
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
                item.senderId === currentUserId ? "justify-end" : ""
              } space-x-3 px-2`}>
              {item.senderId !== currentUserId && (
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
                    item.senderId === currentUserId
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100"
                  } p-4`}>
                  <p>{item.text}</p>
                </div>
                <p
                  className={`mt-1 ${
                    item.senderId === currentUserId
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
