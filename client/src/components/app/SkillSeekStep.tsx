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

type SkillSeekStepProps = {
  selectedSeekSkills: string[];
  otherSeekSkill: string;
  handleAddOtherSkill: (
    e: React.FormEvent<HTMLFormElement>,
    otherSkill: string,
    selectedSkills: string[],
    setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>,
    setOtherSkill: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  setSelectedSeekSkills: React.Dispatch<React.SetStateAction<string[]>>;
  setOtherSeekSkill: React.Dispatch<React.SetStateAction<string>>;
  prevStep: () => void;
  handleCompleteProfile: () => void;
};

const SkillSeekStep: FC<SkillSeekStepProps> = ({
  selectedSeekSkills,
  otherSeekSkill,
  handleAddOtherSkill,
  setSelectedSeekSkills,
  setOtherSeekSkill,
  prevStep,
  handleCompleteProfile,
}) => {
  const handleCreateUser = () => {
    if (selectedSeekSkills.length === 0) {
      return toast.error("Seeked skill can't be empty");
    }

    handleCompleteProfile();
  };

  return (
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
                  htmlFor={`seek-${skill.toLowerCase().replace(/ /g, "-")}`}
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
            <Button className="bg-emerald-600 hover:bg-emerald-700">Add</Button>
          </form>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-4">
        <div className="flex w-full justify-between">
          <Button onClick={prevStep} variant="ghost">
            Back
          </Button>
          <Button
            onClick={handleCreateUser}
            className="bg-emerald-600 hover:bg-emerald-700">
            Complete Profile
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkillSeekStep;
