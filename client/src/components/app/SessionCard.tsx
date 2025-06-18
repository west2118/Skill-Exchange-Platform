import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

type SessionCardProps = {
  index: number;
  session: {
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    address: string;
  };
  handleRemoveSession: (index: number) => void;
  handleSessionChange: (index: number, name: string, value: string) => void;
};

const SessionCard = ({
  index,
  session,
  handleRemoveSession,
  handleSessionChange,
}: SessionCardProps) => {
  return (
    <div className="rounded-lg border p-6 space-y-4 bg-card">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg">Session {index + 1}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleRemoveSession(index)}
          className="text-red-500 hover:bg-red-50">
          <Trash2 className="h-4 w-4 mr-2" />
          Remove
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>From Date</Label>
          <Popover>
            <PopoverTrigger className="w-full" asChild>
              <div className="w-full">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {session.date ? format(session.date, "PPP") : "Pick a date"}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={session.date ? new Date(session.date) : undefined}
                onSelect={(date) =>
                  date && handleSessionChange(index, "date", date.toISOString())
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`startTime-${index}`}>Start Time</Label>
            <Input
              type="time"
              value={session.startTime}
              onChange={(e) =>
                handleSessionChange(index, "startTime", e.target.value)
              }
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`startTime-${index}`}>Start Time</Label>
            <Input
              type="time"
              value={session.endTime}
              onChange={(e) =>
                handleSessionChange(index, "endTime", e.target.value)
              }
              className="w-full text-end pr-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`location-${index}`}>Location Name</Label>
          <Input
            id={`location-${index}`}
            type="text"
            placeholder="e.g. Central Park"
            className="w-full"
            value={session.location}
            onChange={(e) =>
              handleSessionChange(index, "location", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`address-${index}`}>Full Address</Label>
          <Input
            id={`address-${index}`}
            type="text"
            placeholder="e.g. 123 Main St, City, State"
            className="w-full"
            value={session.address}
            onChange={(e) =>
              handleSessionChange(index, "address", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
