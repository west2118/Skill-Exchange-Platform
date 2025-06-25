import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import { formatDate } from "@/constants/formatDate";
import { useState } from "react";
import { privateApi } from "@/utils/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/userSlice";
import { editDeal } from "@/store/dealSlice";
import SuccessBanner from "@/components/app/SuccessBanner";
import NextStep from "@/components/app/NextStep";

const starsCount = [1, 2, 3, 4, 5];

export default function CompletionPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const deals = useAppSelector((state) => state.deal.deals);
  const users = useAppSelector((state) => state.user.users);

  const deal = deals.find((deal) => deal._id === id);

  const otherUserId =
    deal?.receiverId === currentUserId ? deal?.proposerId : deal?.receiverId;

  const otherUserInfo = users.find((user: any) => user._id === otherUserId);
  const currentUserInfo = users.find((user: any) => user._id === currentUserId);

  const yourSkill =
    deal?.receiverId === currentUserId ? deal?.skillOffer : deal?.skillSeek;

  const otherSkill =
    deal?.receiverId === currentUserId ? deal?.skillSeek : deal?.skillOffer;

  const yourRating =
    deal?.receiverId === currentUserId
      ? deal?.ratings?.receiverRated
      : deal?.ratings?.proposerRated;

  const handleSubmitReview = async (e: any) => {
    e.preventDefault();

    const reviewData = {
      dealId: deal?._id,
      rating,
      review,
      otherUserId,
    };

    console.log(reviewData);

    try {
      const response = await privateApi.put(
        `http://localhost:8080/api/review/${currentUserId}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response?.data?.message);
      dispatch(
        updateUser({
          userId: otherUserId,
          newData: response?.data?.updatedUser,
        })
      );
      dispatch(
        editDeal({
          dealId: deal?._id,
          newData: response?.data?.updatedDeal,
        })
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Success Banner */}
          <SuccessBanner />

          {/* Exchange Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Exchange Summary</CardTitle>
              <CardDescription>
                Your skill exchange with Sarah Johnson
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/avatars/user.jpg" />
                      <AvatarFallback>{`${currentUserInfo?.firstName.charAt(
                        0
                      )}${currentUserInfo?.lastName.charAt(
                        0
                      )}`}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">You Provided</h3>
                      <p className="text-sm text-gray-600">{yourSkill}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Sessions Completed</Label>
                    <p className="font-medium">
                      {deal?.sessions?.length} sessions
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Dates</Label>
                    <p className="font-medium">
                      {deal?.sessions
                        ?.map((session: any) => formatDate(session.date))
                        .join(", ")}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/avatars/sarah.jpg" />
                      <AvatarFallback>{`${otherUserInfo?.firstName.charAt(
                        0
                      )}${otherUserInfo?.lastName.charAt(0)}`}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">
                        {`${otherUserInfo?.firstName} ${otherUserInfo?.lastName}`}{" "}
                        Provided
                      </h3>
                      <p className="text-sm text-gray-600">{otherSkill}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Services Performed</Label>
                    <p className="font-medium">
                      {`${yourSkill}, ${otherSkill}`}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <p className="font-medium">
                      {deal?.sessions
                        ?.map((session: any) => session.location)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rating Section */}
          {!yourRating?.hasRated && (
            <Card>
              <form onSubmit={handleSubmitReview}>
                <CardHeader>
                  <CardTitle>Rate Your Experience</CardTitle>
                  <CardDescription>
                    Help build the LocalLoop community by sharing your feedback
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 mt-4">
                  {/* Overall Rating */}
                  <div className="space-y-2">
                    <Label>Overall Rating</Label>
                    <div className="flex items-center space-x-1">
                      {starsCount.map((value) => (
                        <button
                          type="button"
                          key={value}
                          onClick={() => setRating(value)}
                          className="h-10 w-10 text-2xl focus:outline-none text-yellow-400">
                          {value <= rating ? "★" : "☆"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Written Review */}
                  <div className="space-y-2">
                    <Label>Written Review</Label>
                    <textarea
                      id="review"
                      name="review"
                      value={review}
                      onChange={(e: any) => setReview(e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black mt-1"
                      placeholder="Write your review here..."></textarea>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end mt-2">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Submit Review
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {/* Next Steps */}
          {yourRating?.hasRated && <NextStep otherUserInfo={otherUserInfo} />}
        </div>
      </main>
    </div>
  );
}
