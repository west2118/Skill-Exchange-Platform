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
import { SessionModal } from "./SessionModal";
import { useState } from "react";
import { formatTimeWithIntl } from "@/constants/formatTimeWithInt";
import { privateApi } from "@/utils/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { editDeal } from "@/store/dealSlice";

const ActiveDealCard = ({ active, onRefresh }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const users = useAppSelector((state) => state.user.users);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const otherUserId =
    active?.receiverId === currentUserId
      ? active?.proposerId
      : active?.receiverId;

  const otherUser = users.find((user: any) => user._id === otherUserId);

  const yourSkill =
    active?.receiverId === currentUserId
      ? active?.skillOffer
      : active?.skillSeek;

  const otherSkill =
    active?.receiverId === currentUserId
      ? active?.skillSeek
      : active?.skillOffer;

  const isSessionCompleted = (session: any) => {
    const end = new Date(session.date);
    const [hour, minute] = session.endTime.split(":").map(Number);
    end.setHours(hour, minute, 0, 0);
    return end < new Date();
  };

  const getNextSession = (sessions: any[]) => {
    return sessions
      .filter((session) => !isSessionCompleted(session))
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )[0];
  };

  const nextSession = getNextSession(active.sessions);
  const completedSessions = active.sessions.filter(isSessionCompleted).length;
  const isNextSessionCompleted = nextSession
    ? isSessionCompleted(nextSession)
    : true;
  const totalSessions = active.sessions.length;

  const handleMarkAsCompleted = async () => {
    try {
      const response = await privateApi.put(
        `http://localhost:8080/api/deal-completed/${currentUserId}`,
        { dealId: active._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onRefresh();
      toast.success(response?.data?.message);
      dispatch(
        editDeal({
          dealId: active?._id,
          newData: response?.data?.updatedDeal,
        })
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/sarah.jpg" />
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
        <Badge variant="outline" className="text-gray-500">
          {active?.status}
        </Badge>
      </CardHeader>
      <CardContent>
        {active.sessions.length > 0 && active.status === "In Progress" ? (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Next Session</Label>
                <p className="font-medium">
                  {nextSession
                    ? new Date(nextSession.date).toLocaleDateString(undefined, {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </p>
                <p className="text-sm text-gray-600">
                  {nextSession ? (
                    `${formatTimeWithIntl(
                      nextSession.startTime
                    )} - ${formatTimeWithIntl(nextSession.endTime)}`
                  ) : (
                    <p className="text-gray-500 italic text-base">
                      Session Completed
                    </p>
                  )}
                </p>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <p className="font-medium">
                  {nextSession ? nextSession.location : ""}
                </p>
                <p className="text-sm text-gray-600">
                  {nextSession ? (
                    nextSession.address
                  ) : (
                    <p className="text-gray-500 italic text-base">
                      Session Completed
                    </p>
                  )}
                </p>
              </div>
              <div className="space-y-2">
                <Label>Progress</Label>
                <div className="flex items-center space-x-2">
                  <Progress
                    value={(completedSessions / totalSessions) * 100}
                    className="h-2"
                  />
                  <span className="text-sm text-gray-600">
                    {completedSessions} of {totalSessions} sessions
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              {isNextSessionCompleted ? (
                <Button
                  onClick={handleMarkAsCompleted}
                  className="bg-blue-600 hover:bg-blue-700">
                  Mark As Completed
                </Button>
              ) : (
                <div className="w-full flex items-center justify-between">
                  <Button className="bg-red-600 hover:bg-red-700">
                    Cancel Deal
                  </Button>
                  <div className="space-x-4">
                    <Link to={`/messages/${otherUser?.uid}`}>
                      <Button variant="outline">Message</Button>
                    </Link>
                    {active?.proposerId === currentUserId ? (
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Reschedule
                      </Button>
                    ) : (
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Request Reschedule
                      </Button>
                    )}
                  </div>
                </div>
              )}
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
              <div className="space-x-4">
                <Link to={`/messages/${otherUser?.uid}`}>
                  <Button variant="outline">Message</Button>
                </Link>
                {active?.proposerId === currentUserId ? (
                  active?.sessions.length > 0 ? (
                    <Button
                      onClick={() => navigate(`/edit-session/${active._id}`)}
                      className="bg-blue-600 hover:bg-blue-700">
                      Update Session
                    </Button>
                  ) : (
                    <Button
                      onClick={() => navigate(`/add-session/${active._id}`)}
                      className="bg-blue-600 hover:bg-blue-700">
                      Schedule Session
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>

      <SessionModal
        otherUserId={otherUser?.uid}
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        dealId={active._id}
      />
    </Card>
  );
};

export default ActiveDealCard;
