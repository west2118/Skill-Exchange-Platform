import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/hooks/useAppSelector";
import { privateApi } from "@/utils/axios";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";

type ProposedModalProps = {
  isModalOpen: boolean;
  isCancel: () => void;
  name: string;
  skillSeek: string;
  skillOffer: string;
  receiverId: string;
  postId: string;
  exchangeId: string | null;
};

const ProposedModal = ({
  isModalOpen,
  isCancel,
  name,
  skillSeek,
  skillOffer,
  receiverId,
  postId,
  exchangeId,
}: ProposedModalProps) => {
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const exchanges = useAppSelector((state) => state.exchange.exchanges);
  const [message, setMessage] = useState(
    `I noticed you offer ${skillOffer}. I'd be happy to provide ${skillSeek} in exchange.`
  );

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

  useEffect(() => {
    if (exchangeId) {
      const exchange = exchanges.find(
        (exchange) => exchange._id === exchangeId
      );

      if (!exchange) return;

      setMessage(exchange.message || "");
    }
  }, [exchanges, exchangeId]);

  const handleSubmitExchange = async () => {
    if (message.trim().length === 0) {
      return toast.error("Required Field is missing");
    }

    const exchangeData = {
      proposerId: currentUserId,
      receiverId,
      postId,
      skillOffer,
      skillSeek,
      message,
    };

    try {
      const response = await privateApi.post(
        "http://localhost:8080/api/exchange",
        exchangeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      isCancel();
      toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!isModalOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      onClick={isCancel}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Propose Skill Exchange</h3>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                You're proposing to exchange:
              </p>
              <p className="font-medium mt-1">{skillSeek}</p>
            </div>

            <div className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </div>

            <div className="flex-1 text-end">
              <p className="text-sm text-gray-600">For {name}'s</p>
              <p className="font-medium mt-1">{skillOffer}</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700">
              Proposal Message
            </label>
            {!exchangeId ? (
              <Textarea
                id="message"
                required
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder={`Hi ${name}, I'd like to exchange my ${skillSeek.toLowerCase()} for your ${skillOffer.toLowerCase()}...`}
                className="min-h-[120px]"
              />
            ) : (
              <div className="min-h-[120px] rounded-md border border-gray-300 bg-gray-50 p-4 text-gray-700 shadow-sm">
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}

        <div className="p-4 border-t flex justify-end space-x-2">
          <Button onClick={isCancel} type="button" variant="outline">
            {!exchangeId ? "Cancel" : "Close"}
          </Button>
          {!exchangeId && (
            <Button
              onClick={handleSubmitExchange}
              className="bg-green-600 hover:bg-green-700">
              Send Proposal
            </Button>
          )}
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ProposedModal;
