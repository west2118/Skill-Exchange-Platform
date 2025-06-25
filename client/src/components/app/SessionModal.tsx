import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  Calendar,
  CalendarDays,
  Clock,
  MapPin,
  X,
} from "lucide-react";
import ReactDOM from "react-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import { formatTimeWithIntl } from "@/constants/formatTimeWithInt";
import { useEffect } from "react";
import { privateApi } from "@/utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type SessionModalProps = {
  isModalOpen: boolean;
  dealId: string;
  onCloseModal: () => void;
  otherUserId: string | undefined;
};

export function SessionModal({
  isModalOpen,
  dealId,
  onCloseModal,
  otherUserId,
}: SessionModalProps) {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const deals = useAppSelector((state) => state.deal.deals);
  const deal = deals.find((deal) => deal._id === dealId);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  const handleSubmitExchange = async () => {
    try {
      const response = await privateApi.put(
        `http://localhost:8080/api/session-deal/${currentUserId}`,
        { dealId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!isModalOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full max-h-[80vh] bg-background rounded-lg shadow-lg flex flex-col border">
        {/* Modal Header */}
        <div className="p-6 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Session Details
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {deal?.skillOffer} ↔ {deal?.skillSeek}
              </p>
            </div>
            <button
              onClick={onCloseModal}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 pt-4 space-y-4">
          {deal?.sessions?.length ? (
            deal?.sessions?.map((session: any, index: number) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow gap-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    {new Date(session.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm text-muted-foreground">
                        {`${formatTimeWithIntl(session?.startTime)} - 
                      ${formatTimeWithIntl(session?.endTime)}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {session?.location}
                        <br />
                        {session?.address}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <div className="flex flex-col items-center text-center mb-6">
                <AlertCircle className="h-12 w-12 text-yellow-500 mb-3" />
                <h2 className="text-xl font-semibold">No Sessions Created</h2>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-muted-foreground mb-6">
                    Your partner hasn't created any skill exchange sessions yet.
                    You can send them a message to coordinate and get started.
                  </p>

                  <div className="flex items-center justify-center gap-3 mb-4 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>No sessions scheduled</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t p-6 flex justify-end space-x-2">
          <Button
            onClick={() => navigate(`/messages/${otherUserId}`)}
            type="button"
            variant="outline">
            Message
          </Button>
          {Array.isArray(deal?.sessions) &&
            deal.sessions.length > 0 &&
            deal?.status === "Pending" && (
              <Button
                onClick={handleSubmitExchange}
                className="bg-green-600 hover:bg-green-700">
                Accept Sessions
              </Button>
            )}
        </div>
      </div>
    </div>,
    modalRoot
  );
}
