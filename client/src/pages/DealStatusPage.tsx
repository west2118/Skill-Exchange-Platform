import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function DealStatusPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Your Skill Exchanges
          </h1>
          <p className="mt-2 text-gray-600">
            Track all your active, completed, and past deals
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled/Expired</TabsTrigger>
          </TabsList>

          {/* Active Deals Tab */}
          <TabsContent value="active" className="space-y-4">
            {/* Deal 1 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/sarah.jpg" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Sarah Johnson</CardTitle>
                    <CardDescription>Bike Repair ↔ Spanish</CardDescription>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800">
                  In Progress
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Next Session</Label>
                    <p className="font-medium">Saturday, June 10</p>
                    <p className="text-sm text-gray-600">2:00 PM - 3:00 PM</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <p className="font-medium">Central Park</p>
                    <p className="text-sm text-gray-600">72nd St entrance</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Progress</Label>
                    <div className="flex items-center space-x-2">
                      <Progress value={25} className="h-2" />
                      <span className="text-sm text-gray-600">
                        1 of 4 sessions
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <Button variant="outline">Reschedule</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Deal 2 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/michael.jpg" />
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Michael T.</CardTitle>
                    <CardDescription>
                      Guitar Lessons ↔ Moving Help
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  Pending Start
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>First Session</Label>
                    <p className="font-medium">Wednesday, June 14</p>
                    <p className="text-sm text-gray-600">6:00 PM - 7:00 PM</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <p className="font-medium">Michael's Apartment</p>
                    <p className="text-sm text-gray-600">123 Main St, Apt 4B</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Progress</Label>
                    <div className="flex items-center space-x-2">
                      <Progress value={0} className="h-2" />
                      <span className="text-sm text-gray-600">Not started</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Confirm Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Completed Deals Tab */}
          <TabsContent value="completed" className="space-y-4">
            {/* Deal 1 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/priya.jpg" />
                    <AvatarFallback>PK</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Priya K.</CardTitle>
                    <CardDescription>
                      Yoga Instruction ↔ Website Help
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">Completed</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <p className="font-medium">May 1 - May 29, 2023</p>
                    <p className="text-sm text-gray-600">4 sessions total</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Your Rating</Label>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="ml-2 text-sm text-gray-600">5.0</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Their Rating</Label>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★★★★☆</span>
                      <span className="ml-2 text-sm text-gray-600">4.5</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <Button variant="outline">View Details</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Exchange Again
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Deal 2 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/alex.jpg" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Alex R.</CardTitle>
                    <CardDescription>
                      Graphic Design ↔ Car Maintenance
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">Completed</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <p className="font-medium">April 5 - April 26, 2023</p>
                    <p className="text-sm text-gray-600">3 sessions total</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Your Rating</Label>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★★★★☆</span>
                      <span className="ml-2 text-sm text-gray-600">4.0</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Their Rating</Label>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="ml-2 text-sm text-gray-600">5.0</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <Button variant="outline">View Details</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Leave Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cancelled/Expired Deals Tab */}
          <TabsContent value="cancelled" className="space-y-4">
            {/* Deal 1 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/jamie.jpg" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Jamie L.</CardTitle>
                    <CardDescription>
                      Home Cooking ↔ Gardening Help
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="destructive">Cancelled</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <p className="font-medium">Cancelled by you</p>
                    <p className="text-sm text-gray-600">May 15, 2023</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Reason</Label>
                    <p className="font-medium">Schedule conflict</p>
                    <p className="text-sm text-gray-600">
                      You: "I had to travel unexpectedly"
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button variant="outline">Reconnect</Button>
                </div>
              </CardContent>
            </Card>

            {/* Deal 2 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/taylor.jpg" />
                    <AvatarFallback>TM</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Taylor M.</CardTitle>
                    <CardDescription>
                      Photography ↔ Spanish Tutoring
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline">Expired</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <p className="font-medium">Expired</p>
                    <p className="text-sm text-gray-600">April 30, 2023</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Reason</Label>
                    <p className="font-medium">No response</p>
                    <p className="text-sm text-gray-600">
                      Taylor didn't confirm the meeting
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <Button variant="outline">View Original</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Start New Deal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
