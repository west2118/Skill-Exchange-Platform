import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/hooks/useAppSelector";
import { updateUser } from "@/store/userSlice";
import { privateApi } from "@/utils/axios";
import { Home, Mail, MapPin, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAddressFromCoords from "@/hooks/useAddressFromCoords";
import type { User } from "@/store/userSlice";

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
    coordinates: {
      lat: null as number | null,
      lng: null as number | null,
    },
  });

  useEffect(() => {
    const user = users.find((user: User) => user._id === id);
    if (id) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        location: {
          zip: user?.location.zip || "",
          address: user?.location.address || "",
        },
        coordinates: {
          lat: user?.coordinates?.lat || null,
          lng: user?.coordinates?.lng || null,
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
        coordinates: { lat: null, lng: null },
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

  const { error, loading, fetchAddress } = useAddressFromCoords();

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const result = await fetchAddress(latitude, longitude);

        if (result && !result.error) {
          setFormData((prev) => ({
            ...prev,
            location: {
              zip: result.zip as string,
              address: result.address as string,
            },
            coordinates: {
              lat: latitude,
              lng: longitude,
            }
          }));
        } else {
          toast.error(result?.error || "Failed to fetch location");
        }
      },
      (error) => {
        toast.error(error.message);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
                <UserIcon className="h-4 w-4" />
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
                <UserIcon className="h-4 w-4" />
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

            <div className="md:col-span-2">
              <Button
                onClick={handleCurrentLocation}
                type="button"
                variant="outline"
                className="w-full">
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 mr-2 text-muted-foreground"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Getting location...
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4" />
                    Use Current Location
                  </>
                )}
              </Button>
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
