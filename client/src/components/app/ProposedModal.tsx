import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import ReactDOM from "react-dom";

type ProposedModalProps = {
  isModalOpen: boolean;
  isCancel: () => void;
  name: string;
  skillSeek: string;
  skillOffer: string;
};

const ProposedModal = ({
  isModalOpen,
  isCancel,
  name,
  skillSeek,
  skillOffer,
}: ProposedModalProps) => {
  if (!isModalOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

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
            <Textarea
              id="message"
              placeholder={`Hi ${name}, I'd like to exchange my ${skillSeek.toLowerCase()} for your ${skillOffer.toLowerCase()}...`}
              className="min-h-[120px]"
              defaultValue={`Hi ${name},\n\nI noticed you offer ${skillOffer}. I'd be happy to provide ${skillSeek} in exchange. `}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end space-x-2">
          <Button onClick={isCancel} type="button" variant="outline">
            Cancel
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            Send Proposal
          </Button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ProposedModal;
