import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useAppSelector } from "@/hooks/useAppSelector";

const ChatCard = ({ user }: any) => {
  return (
    <div className="border-b p-4 hover:bg-gray-50 cursor-pointer bg-gray-50">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="/avatars/sarah.jpg" />
          <AvatarFallback>{`${user?.firstName.charAt(0)}${user?.lastName.charAt(
            0
          )}`}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <p className="font-medium truncate">{`${user?.firstName} ${user?.lastName}`}</p>
            <span className="text-xs text-gray-500">2 min ago</span>
          </div>
          <p className="text-sm text-gray-600 truncate">
            Sounds great! Let's meet Saturday at 2pm
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
