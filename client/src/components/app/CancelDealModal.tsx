import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/hooks/useAppSelector";
import { editDeal } from "@/store/dealSlice";
import { privateApi } from "@/utils/axios";
import { AlertCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

type CancelDealModalProps = {
  isCancelModalOpen: boolean;
  isCancelModalClose: () => void;
  deal: any;
  onRefresh: () => void;
};

const cancelReasons = [
  { id: "schedule", label: "Schedule conflict" },
  { id: "changed-mind", label: "Changed my mind" },
  { id: "found-other", label: "Found another exchange" },
  { id: "other", label: "Other reason" },
];

export function CancelDealModal({
  isCancelModalOpen,
  isCancelModalClose,
  deal,
  onRefresh,
}: CancelDealModalProps) {
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserId = useAppSelector((state) => state.user.currentUserId);

  useEffect(() => {
    if (isCancelModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isCancelModalOpen]);

  if (!isCancelModalOpen) return null;

  const handleCancelDeal = async () => {
    if (!reason) {
      return toast.error("Reason must not missing");
    }

    try {
      const response = await privateApi.put(
        `http://localhost:8080/api/cancel-deal/${currentUserId}`,
        { dealId: deal._id, reason, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response?.data?.message);
      dispatch(
        editDeal({ dealId: deal._id, newData: response?.data?.updatedDeal })
      );
      onRefresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleIsCancel = () => {
    isCancelModalClose();
    setReason("");
    setDescription("");
  };

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      onClick={handleIsCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Cancel Exchange</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              This will notify the other participant
            </p>
          </div>
          <button
            onClick={handleIsCancel}
            type="button"
            className="rounded-sm p-1 hover:bg-accent">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Reason Selection */}
          <div className="space-y-3">
            <Label>Reason for cancellation</Label>
            <RadioGroup
              value={reason}
              onValueChange={(value) => setReason(value)}
              className="grid gap-3">
              {cancelReasons.map((reason) => (
                <div key={reason.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason.label} id={reason.id} />
                  <Label htmlFor={reason.id} className="font-normal">
                    {reason.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Additional Notes */}
          <div className="space-y-3">
            <Label htmlFor="cancel-notes">Additional notes (optional)</Label>
            <Textarea
              id="cancel-notes"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Let the other participant know why you're canceling..."
              className="min-h-[100px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={handleIsCancel}
              type="button"
              variant="outline"
              className="flex-1">
              Go Back
            </Button>
            <Button
              onClick={handleCancelDeal}
              variant="destructive"
              className="flex-1">
              Confirm Cancellation
            </Button>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
