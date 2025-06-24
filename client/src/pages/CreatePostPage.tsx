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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { skills } from "../constants/skills";
import { timeSlots } from "../constants/timeslots";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Selection from "@/components/app/Selection";
import { format } from "date-fns";
import { privateApi } from "@/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import useAddressFromCoords from "@/hooks/useAddressFromCoords";
import { addPost, editPost } from "@/store/postSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";

const MemoizedSelection = React.memo(Selection);

type CreatePostPageProps = {
  isEdit: boolean;
};

export default function CreatePostPage({ isEdit }: CreatePostPageProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUserId = useSelector((state: any) => state.user.currentUserId);
  const token = useSelector((state: any) => state.user.currentUserToken);
  const userId = useSelector((state: any) => state.user.currentUserId);
  const posts = useAppSelector((state: any) => state.post.posts);
  const [selectionData, setSelectionData] = useState({
    skillSeek: "",
    skillOffer: "",
    preferredTime: "",
  });
  const formData = useRef({
    description: "",
    address: "",
    specificSeekSkill: "",
    specificOfferSkill: "",
  });
  const [selectedFromDate, setSelectedFromDate] = useState<Date | undefined>(
    undefined
  );
  const [selectedToDate, setSelectedToDate] = useState<Date | undefined>(
    undefined
  );

  useEffect(() => {
    if (isEdit && id) {
      const post = posts.find((post: any) => post._id === id);
      setSelectionData({
        skillSeek: skills.includes(post?.skillSeek)
          ? post?.skillSeek
          : "Specific Skill",
        skillOffer: skills.includes(post?.skillOffer)
          ? post?.skillOffer
          : "Specific Skill",
        preferredTime: post?.preferredTime || "",
      });
      setSelectedFromDate(post?.availTimeFrom || "");
      setSelectedToDate(post?.availTimeTo || "");
      formData.current.description = post?.description || "";
      formData.current.address = post?.address || "";
      formData.current.specificSeekSkill = skills.includes(post?.skillSeek)
        ? ""
        : post?.skillSeek;
      formData.current.specificOfferSkill = skills.includes(post?.skillOffer)
        ? ""
        : post?.skillOffer;
    } else {
      setSelectionData({
        skillSeek: "",
        skillOffer: "",
        preferredTime: "",
      });
      setSelectedFromDate(undefined);
      setSelectedToDate(undefined);
      formData.current.description = "";
      formData.current.address = "";
      formData.current.specificSeekSkill = "";
      formData.current.specificOfferSkill = "";
    }
  }, [isEdit, id, posts]);

  const { error, loading, fetchAddress } = useAddressFromCoords();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    formData.current = {
      ...formData.current,
      [name]: value,
    };
  };

  const handleSelectChange = (name: string, value: string) => {
    setSelectionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const result = await fetchAddress(latitude, longitude);

        if (result) {
          formData.current.address = result.address;
        } else {
          toast.error(error);
        }
      },
      (error) => {
        toast.error(error.message);
      }
    );
  };

  const isSpecificSeekSkill =
    selectionData.skillSeek === "Specific Skill"
      ? formData.current.specificSeekSkill
      : selectionData.skillSeek;

  const isSpecificOfferSkill =
    selectionData.skillOffer === "Specific Skill"
      ? formData.current.specificOfferSkill
      : selectionData.skillOffer;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isAlreadyFormatted = (value: any) =>
      typeof value === "string" && /\d{1,2}\/\d{1,2}\/\d{2,4}/.test(value);

    const postData = {
      skillSeek: isSpecificSeekSkill,
      skillOffer: isSpecificOfferSkill,
      description: formData.current.description,
      availTimeFrom: selectedFromDate
        ? isAlreadyFormatted(selectedFromDate)
          ? selectedFromDate
          : selectedFromDate.toLocaleDateString()
        : "",

      availTimeTo: selectedToDate
        ? isAlreadyFormatted(selectedToDate)
          ? selectedToDate
          : selectedToDate.toLocaleDateString()
        : "",
      preferredTime: selectionData.preferredTime,
      address: formData.current.address,
    };

    try {
      let response;
      if (isEdit && id) {
        response = await privateApi.put(
          `http://localhost:8080/api/post/${id}`,
          { ...postData, userId: currentUserId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await privateApi.post(
          `http://localhost:8080/api/post/${userId}`,
          postData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (isEdit && id) {
        dispatch(
          editPost({ postId: id, newData: response?.data?.updatedPost })
        );
      } else {
        dispatch(addPost(response?.data?.newPost));
      }

      toast.success(response?.data?.message);
      navigate("/dashboard?tab=my-post");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {isEdit && id ? "Edit" : "Create New"} Post
                </CardTitle>
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
                      <MemoizedSelection
                        constArray={skills}
                        value={selectionData.skillSeek}
                        onChange={(value) =>
                          handleSelectChange("skillSeek", value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Specific Skill</Label>
                      <Input
                        name="specificSeekSkill"
                        onChange={handleChange}
                        defaultValue={formData.current.specificSeekSkill}
                        disabled={selectionData.skillSeek !== "Specific Skill"}
                        placeholder="e.g. Bicycle Repair, Spanish Tutoring"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Skill offering</Label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Skill Category</Label>
                      <MemoizedSelection
                        constArray={skills}
                        value={selectionData.skillOffer}
                        onChange={(value) =>
                          handleSelectChange("skillOffer", value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Specific Skill</Label>
                      <Input
                        name="specificOfferSkill"
                        defaultValue={formData.current.specificOfferSkill}
                        disabled={selectionData.skillOffer !== "Specific Skill"}
                        onChange={handleChange}
                        placeholder="e.g. Bicycle Repair, Spanish Tutoring"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    name="description"
                    defaultValue={formData.current.description}
                    onChange={handleChange}
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
                      <Popover>
                        <PopoverTrigger className="w-full" asChild>
                          <div className="w-full">
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedFromDate
                                ? format(selectedFromDate, "PPP")
                                : "Pick a date"}
                            </Button>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedFromDate}
                            onSelect={setSelectedFromDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>To Date</Label>
                      <Popover>
                        <PopoverTrigger className="w-full" asChild>
                          <div className="w-full">
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedToDate
                                ? format(selectedToDate, "PPP")
                                : "Pick a date"}
                            </Button>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={selectedToDate}
                            onSelect={setSelectedToDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2">
                    <Label>Preferred Time</Label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <MemoizedSelection
                        constArray={timeSlots}
                        value={selectionData.preferredTime}
                        onChange={(value) =>
                          handleSelectChange("preferredTime", value)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="flex space-x-4">
                    <Input
                      name="address"
                      defaultValue={formData.current.address}
                      onChange={handleChange}
                      placeholder="Enter location or address"
                      className="flex-1"
                    />
                    <Button
                      onClick={handleCurrentLocation}
                      type="button"
                      variant="outline">
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-muted-foreground"
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
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          Use Current
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <Button
                  onClick={() => navigate(-1)}
                  type="button"
                  variant="outline">
                  Cancel
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  {isEdit && id ? "Edit" : "Create"} Post
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    </div>
  );
}
