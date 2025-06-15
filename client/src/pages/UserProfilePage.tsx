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
// import { Progress } from "@/components/ui/progress";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { formatDate } from "@/constants/formatDate";
import SkillCard from "@/components/app/SkillCard";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

export default function UserProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const users = useSelector((state: any) => state.user.users);

  const user = users.find((user: any) => user._id === id);

  const handleLogout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback>{`${user?.firstName.slice(
                      0,
                      1
                    )}${user?.lastName.slice(0, 1)}`}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{`${user?.firstName} ${user?.lastName}`}</CardTitle>
                <CardDescription>
                  Member since {formatDate(user?.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <p className="font-medium">{user?.location?.address}</p>
                </div>
                <div className="space-y-2">
                  <Label>Contact</Label>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </CardContent>
              <CardFooter className="space-y-3 flex flex-col">
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full">
                  Sign Out
                </Button>
              </CardFooter>
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
                        + Edit
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {user?.offeredSkills?.map((skill: string) => (
                        <SkillCard key={skill} skill={skill} />
                      ))}
                    </div>
                  </div>

                  {/* Skills Needed */}
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <Label className="text-emerald-600">Skills Needed</Label>
                      <Button variant="ghost" size="sm">
                        + Edit
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {user?.seekedSkills?.map((skill: string) => (
                        <SkillCard key={skill} skill={skill} />
                      ))}
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
            {/* <Card>
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
            </Card> */}
          </div>
        </div>
      </main>
    </div>
  );
}
