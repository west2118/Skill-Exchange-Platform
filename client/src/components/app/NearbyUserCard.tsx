import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProposedModal from "./ProposedModal";
import { useState } from "react";

const NearbyUserCard = ({ item }: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const users = useSelector((state: any) => state.user.users);

  const user = users.find((user: any) => item.userId === user._id);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar>
          <AvatarImage />
          <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <Link
            to={`/profile/${item?.userId}`}
            className="hover:underline transition-colors duration-200">
            <CardTitle>{`${user?.firstName} ${user?.lastName}`}</CardTitle>
          </Link>
          <CardDescription>{item?.distance} away</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <Label>Offering</Label>
            <p className="font-medium">{item?.skillOffer}</p>
          </div>
          <div>
            <Label>Seeking</Label>
            <p className="font-medium">{item?.skillSeek}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View Details</Button>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700">
          Propose Exchange
        </Button>
      </CardFooter>

      <ProposedModal
        isModalOpen={isModalOpen}
        isCancel={() => setIsModalOpen(false)}
        name={`${user?.firstName} ${user?.lastName}`}
        skillSeek={item?.skillSeek}
        skillOffer={item?.skillOffer}
        receiverId={item?.userId}
        postId={item?._id}
        exchangeId={null}
      />
    </Card>
  );
};

export default NearbyUserCard;
