import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import ProposedModal from "./ProposedModal";
import { PostDetailsModal } from "./PostDetailsModal";

const MatchedPostCard = ({ match, onRefresh }: any) => {
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const users = useSelector((state: any) => state.user.users);

  const user = users.find((user: any) => match?.userId === user._id);

  return (
    <Card key={match._id}>
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar>
          <AvatarImage />
          <AvatarFallback>{user?.firstName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{`${user?.firstName} ${user?.lastName}`}</CardTitle>
          <CardDescription>Perfect match!</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <Label>Potential Exchange</Label>
            <p className="font-medium">{`your ${match?.skillSeek} ↔ ${match?.skillOffer}`}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => setIsModalDetailsOpen(true)} variant="outline">
          View Details
        </Button>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700">
          Start Exchange
        </Button>
      </CardFooter>

      <ProposedModal
        isModalOpen={isModalOpen}
        isCancel={() => setIsModalOpen(false)}
        name={`${user?.firstName} ${user?.lastName}`}
        skillSeek={match?.skillSeek}
        skillOffer={match?.skillOffer}
        receiverId={match?.userId}
        postId={match?._id}
        exchangeId={null}
        onRefresh={onRefresh}
      />

      <PostDetailsModal
        isModalDetailsOpen={isModalDetailsOpen}
        isClose={() => setIsModalDetailsOpen(false)}
        item={match}
        user={user}
      />
    </Card>
  );
};

export default MatchedPostCard;
