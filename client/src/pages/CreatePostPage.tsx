import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { skills } from "@/constants/skills";
import { timeSlots } from "@/constants/timeslots";
import { useState } from "react";

export default function CreatePostPage() {
  const [selectedFromDate, setSelectedFromDate] = useState<Date | undefined>(
    undefined
  );
  const [selectedToDate, setSelectedToDate] = useState<Date | undefined>(
    undefined
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
              <CardDescription>
                Share what skill you're offering or seeking in your community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Skill Selection */}
              <div className="space-y-4">
                <Label>Skill seeking</Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Skill Category</Label>
                    <div className="w-full">
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {skills.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Specific Skill</Label>
                    <Input placeholder="e.g. Bicycle Repair, Spanish Tutoring" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Skill offering</Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Skill Category</Label>
                    <div className="w-full">
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {skills.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Specific Skill</Label>
                    <Input placeholder="e.g. Bicycle Repair, Spanish Tutoring" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Tell people more about what you're offering or seeking. Include any requirements, your experience level, etc."
                  rows={5}
                />
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <Label>Availability</Label>

                {/* Date Selection */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>From Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedFromDate}
                      onSelect={setSelectedFromDate}
                      initialFocus
                    />
                    {/* <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Pick a date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" initialFocus />
                      </PopoverContent>
                    </Popover> */}
                  </div>
                  <div className="space-y-2">
                    <Label>To Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedToDate}
                      onSelect={setSelectedToDate}
                      initialFocus
                    />
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-2">
                  <Label>Preferred Time</Label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select time availability" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Location</Label>
                <div className="flex space-x-4">
                  <Input
                    placeholder="Enter location or address"
                    className="flex-1"
                  />
                  <Button variant="outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Use Current
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Create Post
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
