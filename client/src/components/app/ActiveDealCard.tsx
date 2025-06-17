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
import { Progress } from "../ui/progress";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Link, useNavigate } from "react-router-dom";

const ActiveDealCard = ({ active }: { active: any }) => {
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const users = useAppSelector((state) => state.user.users);
  const user = users.find((user) => user._id === active.proposerId);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/sarah.jpg" />
              <AvatarFallback>{`${user?.firstName.charAt(
                0
              )}${user?.lastName.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{`${user?.firstName} ${user?.lastName}`}</CardTitle>
              <CardDescription>
                your {active?.skillOffer} ↔ {active?.skillSeek}
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-gray-500">
            {active?.status}
          </Badge>
        </CardHeader>
        <CardContent>
          {active.sessions.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Next Session</Label>
                  <p className="font-medium">Saturday, June 10</p>
                  <p className="text-sm text-gray-600">2:00 PM - 3:00 PM</p>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <p className="font-medium">Central Park</p>
                  <p className="text-sm text-gray-600">72nd St entrance</p>
                </div>
                <div className="space-y-2">
                  <Label>Progress</Label>
                  <div className="flex items-center space-x-2">
                    <Progress value={25} className="h-2" />
                    <span className="text-sm text-gray-600">
                      1 of 4 sessions
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <Link to="/messages">
                  <Button variant="outline">Message</Button>
                </Link>
                <Button variant="outline">Reschedule</Button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Next Session</Label>
                  <p className="text-gray-500 italic">Not scheduled</p>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <p className="text-gray-500 italic">To be determined</p>
                </div>
                <div className="space-y-2">
                  <Label>Progress</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      No active sessions
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between align-center space-x-4">
                <Button className="bg-red-600 hover:bg-red-700">
                  Cancel Deal
                </Button>
                <div className="space-x-2">
                  <Link to="/messages">
                    <Button variant="outline">Message</Button>
                  </Link>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    {active?.proposerId === currentUserId
                      ? "Schedule Session"
                      : "View Details"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ActiveDealCard;
