import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function MatchingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-emerald-600">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="font-bold text-emerald-600">LocalLoop</span>
          </div>
          <nav className="flex items-center space-x-6">
            <Button variant="ghost">Dashboard</Button>
            <Button variant="ghost">Messages</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Find Matches
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Find Your Perfect Skill Match
            </h1>
            <p className="mt-2 text-gray-600">
              Swipe through potential matches based on your skills and interests
            </p>
          </div>

          {/* Matching Progress */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Daily matches</span>
              <span className="text-sm font-medium">3/10 remaining</span>
            </div>
            <Progress value={30} className="h-2" />
          </div>

          {/* Current Match Card */}
          <Card className="relative overflow-hidden">
            <div className="absolute right-4 top-4 z-10">
              <Badge variant="secondary">92% Match</Badge>
            </div>

            <CardHeader className="pb-0">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/avatars/sarah.jpg" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Sarah Johnson</CardTitle>
                  <CardDescription>0.5 miles away</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* What They Offer */}
                <div>
                  <Label className="text-emerald-600">Offering</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-600"></div>
                      <span className="font-medium">Bicycle Repair</span>
                    </div>
                    <p className="pl-4 text-sm text-gray-600">
                      I can fix most bike issues including flat tires, brake
                      adjustments, and gear tuning.
                    </p>
                  </div>
                </div>

                {/* What They Need */}
                <div>
                  <Label className="text-emerald-600">Seeking</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-600"></div>
                      <span className="font-medium">Spanish Conversation</span>
                    </div>
                    <p className="pl-4 text-sm text-gray-600">
                      Looking for someone to practice Spanish with for 1 hour
                      per week.
                    </p>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <Label className="text-emerald-600">Availability</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="outline">Weekends</Badge>
                    <Badge variant="outline">Evenings</Badge>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center space-x-6 pt-6">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-14 w-14">
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
              <Button
                size="lg"
                className="rounded-full h-14 w-14 bg-emerald-600 hover:bg-emerald-700">
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
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-14 w-14">
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
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
              </Button>
            </CardFooter>
          </Card>

          {/* Potential Deal Card (hidden until match) */}
          <Card className="mt-8 hidden">
            <CardHeader>
              <CardTitle>Propose a Deal</CardTitle>
              <CardDescription>
                You and Sarah have matched! Propose how you'd like to exchange
                skills.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Your Offering</Label>
                    <div className="p-4 border rounded-md">
                      <p className="font-medium">Spanish Conversation</p>
                      <p className="text-sm text-gray-600">1 hour per week</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Their Offering</Label>
                    <div className="p-4 border rounded-md">
                      <p className="font-medium">Bicycle Repair</p>
                      <p className="text-sm text-gray-600">As needed</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>First Meeting</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Date</Label>
                      <div className="p-3 border rounded-md text-sm">
                        Saturday, June 10
                      </div>
                    </div>
                    <div>
                      <Label>Time</Label>
                      <div className="p-3 border rounded-md text-sm">
                        2:00 PM - 3:00 PM
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="p-3 border rounded-md text-sm">
                    Central Park - Near the 72nd St entrance
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Message (optional)</Label>
                  <div className="p-3 border rounded-md text-sm h-20">
                    Hi Sarah! I'd love to meet up this Saturday to start our
                    exchange. I can bring my bike for you to look at, and we can
                    chat in Spanish while you work on it.
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Send Deal Request
              </Button>
            </CardFooter>
          </Card>

          {/* Next Match Preview */}
          <div className="mt-8">
            <h3 className="mb-4 font-semibold">Your Next Potential Matches</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Match 1 */}
              <Card className="cursor-pointer hover:border-emerald-300">
                <CardHeader className="flex flex-row items-center space-x-4 pb-3">
                  <Avatar>
                    <AvatarImage src="/avatars/michael.jpg" />
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Michael T.</CardTitle>
                    <CardDescription>87% Match • 1.2mi away</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Guitar Lessons</p>
                      <p className="text-sm text-gray-600">for</p>
                      <p className="text-sm font-medium">Help Moving</p>
                    </div>
                    <Badge variant="outline">Weekends</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Match 2 */}
              <Card className="cursor-pointer hover:border-emerald-300">
                <CardHeader className="flex flex-row items-center space-x-4 pb-3">
                  <Avatar>
                    <AvatarImage src="/avatars/priya.jpg" />
                    <AvatarFallback>PK</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Priya K.</CardTitle>
                    <CardDescription>95% Match • 0.8mi away</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Yoga Instruction</p>
                      <p className="text-sm text-gray-600">for</p>
                      <p className="text-sm font-medium">Website Help</p>
                    </div>
                    <Badge variant="outline">Evenings</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
