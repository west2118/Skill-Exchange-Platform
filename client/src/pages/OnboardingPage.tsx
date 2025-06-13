import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { toast } from "react-toastify";
import { publicApi } from "@/utils/axios";
import LocationStep from "@/components/app/LocationStep";
import SkillOfferStep from "@/components/app/SkillOfferStep";
import SkillSeekStep from "@/components/app/SkillSeekStep";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAddressFromCoords from "@/hooks/useAddressFromCoords";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const currentUserToken = useSelector(
    (state: any) => state.user.currentUserToken
  );
  const [step, setStep] = useState(1);
  const [currentAddress, setCurrentAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [otherOfferSkill, setOtherOfferSkill] = useState("");
  const [otherSeekSkill, setOtherSeekSkill] = useState("");

  const [selectedOfferSkills, setSelectedOfferSkills] = useState<string[]>([]);
  const [selectedSeekSkills, setSelectedSeekSkills] = useState<string[]>([]);

  const { error, loading, fetchAddress } = useAddressFromCoords();

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const result = await fetchAddress(latitude, longitude);

        if (result) {
          setCurrentAddress(result.address);
          setZipCode(result.zip);
        } else {
          toast.error(error);
        }
      },
      (error) => {
        toast.error(error.message);
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

  const handleCompleteProfile = async () => {
    const addedData = {
      location: {
        zip: zipCode,
        address: currentAddress,
      },
      offeredSkills: selectedOfferSkills,
      seekedSkills: selectedSeekSkills,
    };

    try {
      await publicApi.post(
        "http://localhost:8080/api/user-profile",
        {
          ...addedData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUserToken}`,
          },
        }
      );

      toast.success("Created Account Successfully!");
      navigate("/profile");
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
            <LocationStep
              isLoading={loading}
              currentAddress={currentAddress}
              zipCode={zipCode}
              handleCurrentLocation={handleCurrentLocation}
              nextStep={nextStep}
              setZipCode={setZipCode}
              setCurrentAddress={setCurrentAddress}
            />
          )}

          {/* STEP 2 - Skills Selection - Offering */}
          {step === 2 && (
            <SkillOfferStep
              selectedOfferSkills={selectedOfferSkills}
              otherOfferSkill={otherOfferSkill}
              handleAddOtherSkill={handleAddOtherSkill}
              setSelectedOfferSkills={setSelectedOfferSkills}
              setOtherOfferSkill={setOtherOfferSkill}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}

          {/* STEP 3 - Skills Selection - Seeking */}
          {step === 3 && (
            <SkillSeekStep
              selectedSeekSkills={selectedSeekSkills}
              otherSeekSkill={otherSeekSkill}
              handleAddOtherSkill={handleAddOtherSkill}
              setSelectedSeekSkills={setSelectedSeekSkills}
              setOtherSeekSkill={setOtherSeekSkill}
              prevStep={prevStep}
              handleCompleteProfile={handleCompleteProfile}
            />
          )}
        </div>
      </main>
    </div>
  );
}
