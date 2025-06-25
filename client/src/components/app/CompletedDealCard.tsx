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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SessionModal } from "./SessionModal";

const stars = [1, 2, 3, 4, 5];

const CompletedDealCard = ({ deal }: any) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const users = useAppSelector((state) => state.user.users);

  const otherUserId =
    deal?.receiverId === currentUserId ? deal?.proposerId : deal?.receiverId;

  const otherUser = users.find((user: any) => user._id === otherUserId);

  const yourSkill =
    deal?.receiverId === currentUserId ? deal?.skillOffer : deal?.skillSeek;

  const otherSkill =
    deal?.receiverId === currentUserId ? deal?.skillSeek : deal?.skillOffer;

  const yourRating =
    deal?.receiverId === currentUserId
      ? deal?.ratings?.receiverRated
      : deal?.ratings?.proposerRated;

  const otherRating =
    deal?.receiverId === currentUserId
      ? deal?.ratings?.proposerRated
      : deal?.ratings?.receiverRated;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/priya.jpg" />
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
        <Badge variant="secondary">{deal?.status}</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Duration</Label>
            <p className="font-medium">
              {formatDate(deal?.sessions[0].date)} -{" "}
              {formatDate(deal?.sessions[deal?.sessions?.length - 1].date)}
            </p>
            <p className="text-sm text-gray-600">
              {deal?.sessions?.length} sessions total
            </p>
          </div>
          <div className="space-y-2">
            <Label>Your Rating</Label>
            {yourRating?.hasRated ? (
              <div className="flex items-center">
                {stars.map((star) => (
                  <span
                    className={`${
                      star <= yourRating?.rating
                        ? "text-yellow-500"
                        : "text-gray-500"
                    } text-2xl`}>
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {yourRating?.rating.toFixed(1)}
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-gray-300 text-2xl">★★★★★</span>
                <span className="ml-2 text-sm text-muted-foreground italic">
                  You haven't rated this deal yet.
                </span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Their Rating</Label>
            {otherRating?.hasRated ? (
              <div className="flex items-center">
                {stars.map((star) => (
                  <span
                    className={`${
                      star <= otherRating?.rating
                        ? "text-yellow-500"
                        : "text-gray-500"
                    } text-2xl`}>
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {otherRating.rating.toFixed(1)}
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-gray-300 text-2xl">★★★★★</span>
                <span className="ml-2 text-sm text-muted-foreground italic">
                  Your partner haven't rated this deal yet.
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button onClick={() => setIsModalOpen(true)} variant="outline">
            View Details
          </Button>
          {yourRating?.hasRated ? (
            <Button
              onClick={() => navigate(`/messages/${otherUser?.uid}`)}
              className="bg-emerald-600 hover:bg-emerald-700">
              Message
            </Button>
          ) : (
            <Button
              onClick={() => navigate(`/completion/${deal._id}`)}
              className="bg-emerald-600 hover:bg-emerald-700">
              Rate Partner
            </Button>
          )}
        </div>
      </CardContent>

      <SessionModal
        otherUserId={otherUser?.uid}
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        dealId={deal._id}
      />
    </Card>
  );
};

export default CompletedDealCard;
