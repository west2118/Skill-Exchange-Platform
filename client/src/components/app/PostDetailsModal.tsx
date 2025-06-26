import ReactDOM from "react-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Home, Sprout } from "lucide-react";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
};

type Item = {
  skillSeek: string;
  skillOffer: string;
  description: string;
  availTimeFrom: string;
  availTimeTo: string;
  preferredTime: string;
  address: string;
  userId: string;
};

type PostDetailsModalProps = {
  isModalDetailsOpen: boolean;
  isClose: () => void;
  user: User | undefined;
  item: Item | undefined;
};

export function PostDetailsModal({
  isModalDetailsOpen,
  isClose,
  item,
  user,
}: PostDetailsModalProps) {
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const users = useAppSelector((state) => state.user.users);

  const currentUserInfo = users.find((user) => user._id === currentUserId);

  useEffect(() => {
    if (isModalDetailsOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalDetailsOpen]);

  if (!isModalDetailsOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      onClick={isClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[625px] rounded-lg bg-background p-6 shadow-lg">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Exchange Opportunity</h2>
        </div>

        <div className="space-y-6">
          {/* User Profile Section */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {item?.userId === currentUserId
                  ? currentUserInfo?.firstName.charAt(0)
                  : user?.firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">
                {item?.userId === currentUserId
                  ? "Me"
                  : `${user?.firstName} ${user?.lastName}`}
              </h3>
            </div>
          </div>

          {/* Skills Exchange Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Home className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Looking For</h4>
              </div>
              <p className="text-lg font-semibold">{item?.skillSeek}</p>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sprout className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Offering</h4>
              </div>
              <p className="text-lg font-semibold">{item?.skillOffer}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-medium">Description</h4>
            <p className="text-muted-foreground">{item?.description}</p>
          </div>

          {/* Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Availability
              </h4>
              <p className="text-muted-foreground">
                {item?.availTimeFrom} to {item?.availTimeTo}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Preferred Time
              </h4>
              <p className="text-muted-foreground">{item?.preferredTime}</p>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location
            </h4>
            <p className="text-muted-foreground">{item?.address}</p>
          </div>

          <div className="flex pt-4">
            <Button onClick={isClose} variant="outline" className="flex-1">
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
