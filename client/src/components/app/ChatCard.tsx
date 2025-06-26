import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useAppSelector } from "@/hooks/useAppSelector";
import { privateApi } from "@/utils/axios";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";

const ChatCard = ({ user, refreshTrigger }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUserUid = useAppSelector((state) => state.user.currentUserUid);
  const token = useAppSelector((state) => state.user.currentUserToken);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!token) return;

      const roomId = [currentUserUid, user?.uid].sort().join("_");

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
  }, [currentUserUid, user?.uid, token, refreshTrigger]);

  const lastMessage = messages[messages.length - 1];

  return (
    <div
      onClick={() => navigate(`/messages/${user?.uid}`)}
      className={`${
        user?.uid === id ? "bg-gray-100" : ""
      } border-b p-4 hover:bg-gray-50 cursor-pointer w-full h-[110px] flex items-center`}>
      <div className="flex items-center space-x-3 w-full">
        <Avatar>
          <AvatarFallback>{`${user?.firstName.charAt(0)}${user?.lastName.charAt(
            0
          )}`}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between w-full">
            <p className="font-medium truncate">{`${user?.firstName} ${user?.lastName}`}</p>
            <span className="text-xs text-gray-500">
              {lastMessage?.createdAt
                ? `${formatDistanceToNow(new Date(lastMessage.createdAt))} ago`
                : ""}
            </span>
          </div>
          <p className="text-sm text-gray-600 truncate">
            {currentUserUid === lastMessage?.senderId
              ? `You: ${lastMessage?.text}`
              : lastMessage?.text}
          </p>
          <Badge
            variant="outline"
            className="mt-1 border-emerald-200 bg-emerald-50 text-emerald-600">
            Bike Repair ↔ Spanish
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
