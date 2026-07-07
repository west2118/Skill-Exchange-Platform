import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/hooks/useAppSelector";
import { updateUser } from "@/store/userSlice";
import { privateApi } from "@/utils/axios";
import { Home, Mail, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function EditProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.user.users);
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const [userEmail, setUserEmail] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: {
      zip: "",
      address: "",
    },
  });

  useEffect(() => {
    const user = users.find((user: any) => user._id === id);
    if (id) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        location: {
          zip: user?.location.zip || "",
          address: user?.location.address || "",
        },
      });
      setUserEmail(user?.email || "");
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        location: {
          zip: "",
          address: "",
        },
      });
      setUserEmail("");
    }
  }, [users, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await privateApi.post(
        `http://localhost:8080/api/user-profile`,
        { ...formData },
        {
          headers: {
          },
        }
      );

      const data = response?.data;

      console.log(data);

      navigate(`/profile/${currentUserId}`);
      dispatch(updateUser({ userId: currentUserId, newData: data }));
      toast.success("Profile updated successfuly!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header with subtle accent */}
        <div className="bg-gradient-to-r from-white dark:from-gray-800 dark:to-gray-800 p-6 border-b">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Edit Profile Information
          </h2>
          <p className="text-center text-muted-foreground mt-1">
            Update your personal details
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={userEmail}
              disabled
              className="bg-gray-50 dark:bg-gray-800 "
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <User className="h-4 w-4" />
                First Name
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                name="firstName"
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <User className="h-4 w-4" />
                Last Name
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                name="lastName"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="zip"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <MapPin className="h-4 w-4" />
                ZIP Code
              </Label>
              <Input
                id="zip"
                value={formData.location.zip}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: { ...prev.location, zip: e.target.value },
                  }))
                }
                placeholder="Enter your ZIP code"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="address"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Home className="h-4 w-4" />
                Full Address
              </Label>
              <Input
                id="address"
                value={formData.location.address}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: { ...prev.location, address: e.target.value },
                  }))
                }
                placeholder="Enter your full address"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              onClick={() => navigate(`/profile/${currentUserId}`)}
              type="button"
              variant="outline"
              className="flex-1 py-3">
              Discard Changes
            </Button>
            <Button className="flex-1 py-3 bg-gradient-to-r bg-emerald-600 hover:bg-emerald-700">
              Save Profile
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
