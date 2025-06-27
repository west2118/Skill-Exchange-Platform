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
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { formatDate } from "@/constants/formatDate";
import SkillCard from "@/components/app/SkillCard";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import ProfileReviews from "@/components/app/ProfileReviews";
import ProfileSkills from "@/components/app/ProfileSkills";

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
            <ProfileSkills user={user} />

            {/* Reviews Card */}
            <ProfileReviews user={user} />
          </div>
        </div>
      </main>
    </div>
  );
}
