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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { toast } from "react-toastify";
import { publicApi } from "@/utils/axios";
import { skills } from "@/utils/skills";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [otherOfferSkill, setOtherOfferSkill] = useState("");
  const [otherSeekSkill, setOtherSeekSkill] = useState("");

  const [selectedOfferSkills, setSelectedOfferSkills] = useState<string[]>([]);
  const [selectedSeekSkills, setSelectedSeekSkills] = useState<string[]>([]);

  const getAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const response = await publicApi.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${
          import.meta.env.VITE_API_GEOCODER
        }`
      );
      const address = response.data.results[0]?.formatted;
      const components = response.data.results[0]?.components;

      const zip = components?.postcode;

      if (address && zip) {
        setCurrentAddress(address);
        setZipCode(zip);
      } else {
        toast.error("Address or ZIP not found.");
      }
    } catch (error) {
      toast.error("Failed to fetch address.");
    }
  };

  const handleCurrentLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setTimeout(async () => {
          getAddressFromCoords(latitude, longitude);
          setIsLoading(false);
        }, 2000);
      },
      (error) => {
        toast.error(error.message);
        setIsLoading(false);
      }
    );
  };

  const handleAddOtherSkill = (
    e: React.FormEvent<HTMLFormElement>,
    otherSkill: string,
    selectedSkills: string[],
    setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>,
    setOtherSkill: React.Dispatch<React.SetStateAction<string>>
  ) => {
    e.preventDefault();

    try {
      const addSkill = otherSkill
        .split(", ")
        .map((s) => s.trim())
        .filter((s) => s && !selectedSkills.includes(s));

      if (addSkill.length === 0) {
        return toast.error("Skill already selected or input is empty");
      }

      setSelectedSkills((prev) => [...prev, ...addSkill]);
      setOtherSkill("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));

  return (
    <div className="min-h-[93vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Onboarding Content */}
      <main className="mx-auto max-w-7xl px-6 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome to LocalLoop
            </h1>
            <p className="mt-2 text-gray-600">
              Let's set up your profile so you can start exchanging skills in
              your community.
            </p>
            <div className="mt-4 flex items-center justify-center">
              <Progress
                value={(step / 3) * 100}
                className="w-[400px] transition-all duration-500"
              />
            </div>
          </div>

          {/* STEP 1 - Location Step */}
          {step === 1 && (
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Step 1: Set Your Location</CardTitle>
                <CardDescription>
                  This helps us match you with people nearby.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="zipcode">Enter your ZIP code</Label>
                    <Input
                      id="zipcode"
                      placeholder="e.g. 10001"
                      className="mt-2"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Enter your Address</Label>
                    <Input
                      id="address"
                      placeholder="e.g. 123 Main St, New York, NY 10001"
                      className="mt-2"
                      value={currentAddress}
                      onChange={(e) => setCurrentAddress(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={handleCurrentLocation}
                    variant="outline"
                    className="w-full"
                    disabled={isLoading}>
                    {isLoading ? (
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
                        Use My Current Location
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-4">
                <div className="flex w-full justify-between">
                  <Button variant="ghost">Back</Button>
                  <Button
                    onClick={nextStep}
                    className="bg-emerald-600 hover:bg-emerald-700">
                    Continue
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}

          {/* STEP 2 - Skills Selection - Offering */}
          {step === 2 && (
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Step 2: Select Skills You Can Offer</CardTitle>
                <CardDescription>
                  What skills or services can you provide to others?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedOfferSkills.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {skills.map((skill: string) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`offer-${skill.toLowerCase().replace(/ /g, "-")}`}
                          checked={selectedOfferSkills.includes(skill)}
                          onCheckedChange={(checked) => {
                            setSelectedOfferSkills((prev) =>
                              checked
                                ? [...prev, skill]
                                : prev.filter((item) => item !== skill)
                            );
                          }}
                        />
                        <label
                          htmlFor={`offer-${skill
                            .toLowerCase()
                            .replace(/ /g, "-")}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                  <form
                    onSubmit={(e) =>
                      handleAddOtherSkill(
                        e,
                        otherOfferSkill,
                        selectedOfferSkills,
                        setSelectedOfferSkills,
                        setOtherOfferSkill
                      )
                    }
                    className="flex items-end gap-2">
                    <div className="flex flex-col flex-1">
                      <Label
                        htmlFor="otherOfferSkills"
                        className="whitespace-nowrap mb-1">
                        Other Skills
                      </Label>
                      <Input
                        id="otherOfferSkills"
                        placeholder="e.g. Cooking, Painting"
                        className="mt-1"
                        value={otherOfferSkill}
                        onChange={(e) => setOtherOfferSkill(e.target.value)}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700">
                      Add
                    </Button>
                  </form>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-4">
                <div className="flex w-full justify-between">
                  <Button onClick={prevStep} variant="ghost">
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="bg-emerald-600 hover:bg-emerald-700">
                    Continue
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}

          {/* STEP 3 - Skills Selection - Seeking */}
          {step === 3 && (
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Step 3: Select Skills You Want to Learn</CardTitle>
                <CardDescription>
                  What skills or services would you like to receive from others?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedSeekSkills.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {skills.map((skill: string) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`seek-${skill.toLowerCase().replace(/ /g, "-")}`}
                          checked={selectedSeekSkills.includes(skill)}
                          onCheckedChange={(checked) =>
                            setSelectedSeekSkills((prev) =>
                              checked
                                ? [...prev, skill]
                                : prev.filter((item) => item !== skill)
                            )
                          }
                        />
                        <label
                          htmlFor={`seek-${skill
                            .toLowerCase()
                            .replace(/ /g, "-")}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={(e) =>
                      handleAddOtherSkill(
                        e,
                        otherSeekSkill,
                        selectedSeekSkills,
                        setSelectedSeekSkills,
                        setOtherSeekSkill
                      )
                    }
                    className="flex items-end gap-2">
                    <div className="flex flex-col flex-1">
                      <Label
                        htmlFor="otherSeekSkills"
                        className="whitespace-nowrap mb-1">
                        Other Skills
                      </Label>
                      <Input
                        id="otherSeekSkills"
                        placeholder="e.g. Cooking, Painting"
                        className="mt-1"
                        value={otherSeekSkill}
                        onChange={(e) => setOtherSeekSkill(e.target.value)}
                      />
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Add
                    </Button>
                  </form>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-4">
                <div className="flex w-full justify-between">
                  <Button onClick={prevStep} variant="ghost">
                    Back
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Complete Profile
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
