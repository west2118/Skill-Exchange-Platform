import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { skills } from "@/constants/skills";
import type { FC } from "react";
import { toast } from "react-toastify";

type SkillOfferStepProps = {
  selectedOfferSkills: string[];
  otherOfferSkill: string;
  handleAddOtherSkill: (
    e: React.FormEvent<HTMLFormElement>,
    otherSkill: string,
    selectedSkills: string[],
    setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>,
    setOtherSkill: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  setSelectedOfferSkills: React.Dispatch<React.SetStateAction<string[]>>;
  setOtherOfferSkill: React.Dispatch<React.SetStateAction<string>>;
  prevStep: () => void;
  nextStep: () => void;
};

const SkillOfferStep: FC<SkillOfferStepProps> = ({
  selectedOfferSkills,
  otherOfferSkill,
  handleAddOtherSkill,
  setSelectedOfferSkills,
  setOtherOfferSkill,
  prevStep,
  nextStep,
}) => {
  const handleNextStep = () => {
    if (selectedOfferSkills.length === 0) {
      return toast.error("Offered skill can't be empty");
    }

    nextStep();
  };

  return (
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
                  htmlFor={`offer-${skill.toLowerCase().replace(/ /g, "-")}`}
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
              <Label className="whitespace-nowrap mb-1">Other Skills</Label>
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
            onClick={handleNextStep}
            className="bg-emerald-600 hover:bg-emerald-700">
            Continue
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkillOfferStep;
