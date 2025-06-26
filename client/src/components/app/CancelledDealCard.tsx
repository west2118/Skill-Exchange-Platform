import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "../ui/label";
import { useAppSelector } from "@/hooks/useAppSelector";
import { formatDate } from "@/constants/formatDate";
import { Link } from "react-router-dom";

const CancelledDealCard = ({ deal }: any) => {
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const users = useAppSelector((state) => state.user.users);

  const otherUserId =
    deal?.receiverId === currentUserId ? deal?.proposerId : deal?.receiverId;

  const otherUser = users.find((user: any) => user._id === otherUserId);

  const yourSkill =
    deal?.receiverId === currentUserId ? deal?.skillOffer : deal?.skillSeek;

  const otherSkill =
    deal?.receiverId === currentUserId ? deal?.skillSeek : deal?.skillOffer;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/jamie.jpg" />
            <AvatarFallback>{`${otherUser?.firstName.charAt(
              0
            )}${otherUser?.lastName.charAt(0)}`}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{`${otherUser?.firstName} ${otherUser?.lastName}`}</CardTitle>
            <CardDescription>
              your {yourSkill} ↔ {otherSkill}
            </CardDescription>
          </div>
        </div>
        <Badge variant="destructive">{deal?.status}</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Status</Label>
            <p className="font-medium">
              Cancelled by{" "}
              {deal?.isCancelled?.userId === currentUserId
                ? "Me"
                : `${otherUser?.firstName} ${otherUser?.lastName}`}
            </p>
            <p className="text-sm text-gray-600">
              {formatDate(deal?.isCancelled?.cancelledAt)}
            </p>
          </div>
          <div className="space-y-2">
            <Label>Reason</Label>
            <p className="font-medium">{deal?.isCancelled?.reason}</p>
            {deal?.isCancelled?.description && (
              <p className="text-sm text-gray-600">
                {deal?.isCancelled?.userId === currentUserId
                  ? `Me: ${deal?.isCancelled?.description}`
                  : `${otherUser?.firstName} ${otherUser?.lastName}: ${deal?.isCancelled?.description}`}
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Link to={`/messages/${otherUser?.uid}`}>
            <Button variant="outline">Message</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CancelledDealCard;
