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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/avatars/user.jpg" />
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
                <CardTitle>Your Name</CardTitle>
                <CardDescription>Member since June 2023</CardDescription>
                <Badge className="mt-2 bg-emerald-100 text-emerald-800">
                  Verified Member
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <p className="font-medium">New York, NY</p>
                  <p className="text-sm text-gray-600">
                    Within 5 miles of 10001
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>LocalLoop Points</Label>
                  <div className="flex items-center space-x-2">
                    <Progress value={65} className="h-2" />
                    <span className="text-sm font-medium">65/100</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Earn 35 more points for your next badge
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Contact</Label>
                  <p className="font-medium">your.email@example.com</p>
                  <p className="text-sm text-gray-600">Phone: (555) 123-4567</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>

            {/* Badges Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>
                  Earned through skill exchanges
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </div>
                  <span className="mt-2 text-xs text-center">
                    First Exchange
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <span className="mt-2 text-xs text-center">
                    Trusted Member
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <span className="mt-2 text-xs text-center">Skill Sharer</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <span className="mt-2 text-xs text-center">
                    Community Builder
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-100 text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <span className="mt-2 text-xs text-center">Top Rated</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    <span className="text-xs font-bold">+3</span>
                  </div>
                  <span className="mt-2 text-xs text-center">More Badges</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Skills and Reviews */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Skills</CardTitle>
                <CardDescription>
                  What you offer and what you're looking for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Skills Offered */}
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <Label className="text-emerald-600">Skills Offered</Label>
                      <Button variant="ghost" size="sm">
                        + Add
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">
                          Spanish Conversation Practice
                        </span>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">Website Development</span>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">Gardening Help</span>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Skills Needed */}
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <Label className="text-emerald-600">Skills Needed</Label>
                      <Button variant="ghost" size="sm">
                        + Add
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">Bicycle Repair</span>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">Home Repair</span>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">Yoga Instruction</span>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Reviews</CardTitle>
                <CardDescription>
                  What others say about exchanging with you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Review 1 */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/avatars/sarah.jpg" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Sarah J.</p>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★★★★★</span>
                        <span className="ml-2 text-sm text-gray-500">
                          June 15, 2023
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Excellent Spanish tutor! Patient and knowledgeable. Fixed my
                    bike perfectly while we practiced conversation. Highly
                    recommend!
                  </p>
                  <div className="flex space-x-2">
                    <Badge variant="outline">Spanish ↔ Bike Repair</Badge>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/avatars/michael.jpg" />
                      <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Michael T.</p>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★★★★☆</span>
                        <span className="ml-2 text-sm text-gray-500">
                          May 28, 2023
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Great help with my website! Learned a lot about gardening in
                    exchange. Would exchange again.
                  </p>
                  <div className="flex space-x-2">
                    <Badge variant="outline">Website Help ↔ Gardening</Badge>
                  </div>
                </div>

                {/* Review 3 */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/avatars/priya.jpg" />
                      <AvatarFallback>PK</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Priya K.</p>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★★★★★</span>
                        <span className="ml-2 text-sm text-gray-500">
                          April 10, 2023
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Amazing experience! Helped me with home repairs while I
                    taught yoga. Very professional and friendly.
                  </p>
                  <div className="flex space-x-2">
                    <Badge variant="outline">Home Repair ↔ Yoga</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Edit Location Card */}
            <Card>
              <CardHeader>
                <CardTitle>Location Settings</CardTitle>
                <CardDescription>
                  Update your location and search radius
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>ZIP Code</Label>
                    <Input placeholder="10001" />
                  </div>
                  <div className="space-y-2">
                    <Label>Search Radius</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="5 miles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 mile</SelectItem>
                        <SelectItem value="5">5 miles</SelectItem>
                        <SelectItem value="10">10 miles</SelectItem>
                        <SelectItem value="15">15 miles</SelectItem>
                        <SelectItem value="20">20 miles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address (optional)</Label>
                  <Input placeholder="123 Main St, Apt 4B" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
