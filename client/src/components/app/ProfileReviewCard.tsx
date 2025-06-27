import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/hooks/useAppSelector";

const stars = [1, 2, 3, 4, 5];

const ProfileReviewCard = ({ review }: any) => {
  const users = useAppSelector((state) => state.user.users);
  const fromUserInfo = users.find((user) => user._id === review?.fromUserId);
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const deals = useAppSelector((state) => state.deal.deals);

  const deal = deals.find((deal) => deal._id === review?.dealId);

  const yourSkill =
    deal?.receiverId === currentUserId ? deal?.skillOffer : deal?.skillSeek;

  const otherSkill =
    deal?.receiverId === currentUserId ? deal?.skillSeek : deal?.skillOffer;

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="/avatars/sarah.jpg" />
          <AvatarFallback>{`${fromUserInfo?.firstName.charAt(
            0
          )}${fromUserInfo?.lastName.charAt(0)}`}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{`${fromUserInfo?.firstName} ${fromUserInfo?.lastName}`}</p>
          <div className="flex items-center">
            {stars.map((value) => (
              <span className="text-yellow-500">
                {value <= review?.rating ? "★" : "☆"}
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-500">June 15, 2023</span>
          </div>
        </div>
      </div>
      {review?.review && <p className="text-gray-700">{review?.review}</p>}
      <div className="flex space-x-2">
        <Badge variant="outline">
          {yourSkill} ↔ {otherSkill}
        </Badge>
      </div>
    </div>
  );
};

export default ProfileReviewCard;
