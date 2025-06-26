import LoadingSpinner from "@/components/app/LoadingSpinner";
import SessionCard from "@/components/app/SessionCard";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { editDeal } from "@/store/dealSlice";
import { privateApi } from "@/utils/axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Session {
  date: string;
  startTime: number;
  endTime: number;
  location: string;
  address: string;
}

export function SessionExchangeForm({ isEdit = false }: { isEdit: boolean }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deals = useAppSelector((state) => state.deal.deals);
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const token = useAppSelector((state) => state.user.currentUserToken);
  const [sessionData, setSessionData] = useState({
    sessions: [
      {
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        address: "",
      },
    ],
  });

  useEffect(() => {
    if (isEdit) {
      const dealToEdit = deals.find((deal) => deal._id === id);
      setSessionData({
        sessions: (dealToEdit?.sessions || []).map((s: any) => ({
          date: s.date || "",
          startTime: s.startTime || "",
          endTime: s.endTime || "",
          location: s.location || "",
          address: s.address || "",
        })),
      });
    } else {
      setSessionData({
        sessions: [
          {
            date: "",
            startTime: "",
            endTime: "",
            location: "",
            address: "",
          },
        ],
      });
    }
  }, [isEdit, deals, id]);

  const handleAddSession = () => {
    setSessionData((prev) => ({
      ...prev,
      sessions: [
        ...prev.sessions,
        {
          date: "",
          startTime: "",
          endTime: "",
          location: "",
          address: "",
        },
      ],
    }));
  };

  const handleRemoveSession = (index: number) => {
    setSessionData((prev) => ({
      ...prev,
      sessions:
        sessionData.sessions.length > 1
          ? prev.sessions.filter((_, i) => i !== index)
          : prev.sessions,
    }));
  };

  const handleSessionChange = (index: number, name: string, value: string) => {
    setSessionData((prev) => ({
      ...prev,
      sessions: sessionData.sessions.map((session, i) =>
        i === index ? { ...session, [name]: value } : session
      ),
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await privateApi.put(
        `http://localhost:8080/api/session/${currentUserId}`,
        {
          dealId: id,
          sessionData: sessionData.sessions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(editDeal({ dealId: id, newData: response?.data?.updatedDeal }));
      navigate("/deals");
      if (isEdit) {
        toast.success("Session Edited Successfully!");
      } else {
        toast.success("Session Created Successfully!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (isEdit && sessionData.sessions.length < 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-[94vh] bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
      {/* Main Content */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Skill Exchange Sessions</h2>
            <p className="text-sm text-muted-foreground">
              Add the sessions where you'll exchange skills with your partner.
            </p>
          </div>

          <div className="space-y-4">
            {sessionData.sessions.map((session, index) => (
              <SessionCard
                key={index}
                index={index}
                session={session}
                handleRemoveSession={handleRemoveSession}
                handleSessionChange={handleSessionChange}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={handleAddSession}
              className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Session
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-end gap-3 pt-4 border-t">
            <Button
              onClick={() => navigate(-1)}
              type="button"
              variant="outline"
              className="w-full md:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full md:w-auto">
              Save Sessions
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
