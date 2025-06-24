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

export default function CompletionPage() {
  const { id } = useParams();
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const deals = useAppSelector((state) => state.deal.deals);
  const users = useAppSelector((state) => state.user.users);

  const deal = deals.find((deal: any) => deal._id === id);

  const currentUserInfo = users.find((user) => user._id === currentUserId);
  const otherUserId =
    deal?.receiverId === currentUserId ? deal?.proposerId : deal?.receiverId;

  const otherUser = users.find((user: any) => user._id === otherUserId);

  const yourSkill =
    deal?.receiverId === currentUserId ? deal?.skillOffer : deal?.skillSeek;

  const otherSkill =
    deal?.receiverId === currentUserId ? deal?.skillSeek : deal?.skillOffer;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Success Banner */}
          <Card className="border-emerald-200 bg-emerald-50">
            <CardHeader className="text-center gap-0">
              <CardTitle className="text-emerald-800">
                Exchange Completed Successfully! 🎉
              </CardTitle>
            </CardHeader>
          </Card>

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
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">Sarah Provided</h3>
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
          <Card>
            <CardHeader>
              <CardTitle>Rate Your Experience</CardTitle>
              <CardDescription>
                Help build the LocalLoop community by sharing your feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall Rating */}
              <div className="space-y-2">
                <Label>Overall Rating</Label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="h-10 w-10 text-2xl focus:outline-none text-yellow-300">
                      {star <= 4 ? "★" : "☆"}
                    </button>
                  ))}
                  <span className="ml-2 text-gray-600">4 stars</span>
                </div>
              </div>

              {/* Written Review */}
              <div className="space-y-2">
                <Label>Written Review (optional)</Label>
                <div className="p-4 border rounded-md h-32">
                  <p className="text-gray-600">
                    Sarah was fantastic! She fixed my bike quickly while we
                    chatted in Spanish. Her repair skills are excellent and
                    she's very patient with language learners. Would definitely
                    exchange with her again.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Submit Review
              </Button>
            </CardFooter>
          </Card>

          {/* Next Steps */}
          {/* <Card>
            <CardHeader>
              <CardTitle>What Would You Like To Do Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Button variant="outline" className="h-24 flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Message Sarah
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  View Exchange Details
                </Button>
                <Button className="h-24 flex-col bg-emerald-600 hover:bg-emerald-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  Arrange Another Exchange
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                  Find New Matches
                </Button>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </main>
    </div>
  );
}
