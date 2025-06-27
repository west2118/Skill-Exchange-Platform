import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { useAppSelector } from "@/hooks/useAppSelector";
import { formatTimeWithIntl } from "@/constants/formatTimeWithInt";
import { useState } from "react";
import { privateApi } from "@/utils/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { editDeal } from "@/store/dealSlice";

const DealConfirmation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const deals = useAppSelector((state) => state.deal.deals);
  const users = useAppSelector((state) => state.user.users);
  const token = useAppSelector((state) => state.user.currentUserToken);
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const otherUser = users.find((user) => user.uid === id);

  const deal = deals.find(
    (deal) =>
      deal.status !== "Completed" &&
      deal.status !== "Cancelled" &&
      ((deal.proposerId === currentUserId &&
        deal.receiverId === otherUser?._id) ||
        (deal.proposerId === otherUser?._id &&
          deal.receiverId === currentUserId))
  );

  const yourSkill =
    deal?.receiverId === currentUserId ? deal?.skillOffer : deal?.skillSeek;

  const otherSkill =
    deal?.receiverId === currentUserId ? deal?.skillSeek : deal?.skillOffer;

  const firstSession = deal?.sessions?.[0];

  const handleSubmitExchange = async () => {
    if (!isAgree) return;

    try {
      const response = await privateApi.put(
        `http://localhost:8080/api/session-deal/${currentUserId}`,
        { dealId: deal?._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/deals");
      dispatch(
        editDeal({ dealId: deal?._id, newData: response?.data?.updatedDeal })
      );
      toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!deal) return "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirm Exchange Details</CardTitle>
        <CardDescription>
          Review and confirm the terms of your skill exchange
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2 p-4 border rounded-lg">
              <Label className="text-emerald-600 text-sm">
                Exchange Summary
              </Label>

              <div>
                <p className="text-gray-500 text-sm">You Offer</p>
                <p className="font-medium text-base">{yourSkill}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">You Seek</p>
                <p className="font-medium text-base">{otherSkill}</p>
              </div>
            </div>
            <div className="space-y-2 p-4 border rounded-lg">
              <Label className="text-emerald-600">First Meeting</Label>
              {deal?.sessions?.length ? (
                <>
                  <p className="font-medium">Saturday, June 10</p>
                  <p className="text-sm text-gray-600">
                    {formatTimeWithIntl(firstSession?.startTime)} -{" "}
                    {formatTimeWithIntl(firstSession?.endTime)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {`${firstSession?.location} - ${firstSession?.address}`}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium text-gray-500 italic">
                    No session scheduled
                  </p>
                  <p className="text-sm text-gray-400">
                    Pick a date and time to set your first meeting.
                  </p>
                  <p className="text-sm text-gray-400">
                    Location details will appear here once confirmed.
                  </p>
                </>
              )}
            </div>
          </div>

          {deal?.sessions &&
            deal.sessions.length > 0 &&
            deal?.receiverId === currentUserId && (
              <div className="space-y-2 p-4 border rounded-lg">
                <Label className="text-emerald-600">Agreement</Label>
                <div className="flex items-start space-x-3">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      onChange={(e) => setIsAgree(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>
                  <label htmlFor="terms" className="text-sm">
                    I agree to the terms of this skill exchange. Both parties
                    understand this is not a monetary transaction but a mutual
                    exchange of services.
                  </label>
                </div>
              </div>
            )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        {deal?.receiverId !== currentUserId ? (
          deal?.sessions && deal?.sessions.length > 0 ? (
            <Button
              onClick={() => navigate(`/edit-session/${deal?._id}`)}
              className="bg-emerald-600 hover:bg-emerald-700">
              Update Session
            </Button>
          ) : (
            <Button
              onClick={() => navigate(`/add-session/${deal?._id}`)}
              className="bg-emerald-600 hover:bg-emerald-700">
              Schedule Session
            </Button>
          )
        ) : (
          isAgree &&
          deal?.sessions &&
          deal.sessions.length > 0 && (
            <Button
              onClick={handleSubmitExchange}
              className="bg-emerald-600 hover:bg-emerald-700">
              Confirm Exchange
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
};

export default DealConfirmation;
