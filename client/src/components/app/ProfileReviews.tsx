import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ProfileReviewCard from "./ProfileReviewCard";
import NoReviewCard from "./NoReviewCard";

const ProfileReviews = ({ user }: any) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Reviews</CardTitle>
        <CardDescription>
          What others say about exchanging with you
        </CardDescription>
      </CardHeader>
      {user?.review ? (
        <CardContent className="space-y-6">
          {user?.reviews?.map((review: any) => (
            <ProfileReviewCard key={review._id} review={review} />
          ))}
        </CardContent>
      ) : (
        <NoReviewCard />
      )}
    </Card>
  );
};

export default ProfileReviews;
