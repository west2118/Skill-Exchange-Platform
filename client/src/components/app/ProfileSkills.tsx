import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SkillCard from "@/components/app/SkillCard";
import { EditSkillsModal } from "./EditSkillsModal";
import { useState } from "react";

const ProfileSkills = ({ user }: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editType, setEditType] = useState<"offer" | "seek" | null>(null);
  const [editSkills, setEditSkills] = useState<string[]>([]);

  return (
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
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                  setEditType("offer");
                  setEditSkills(user?.offeredSkills);
                }}
                variant="ghost"
                size="sm">
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
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                  setEditType("seek");
                  setEditSkills(user?.seekedSkills);
                }}
                variant="ghost"
                size="sm">
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

      <EditSkillsModal
        isModalOpen={isModalOpen}
        editType={editType}
        onModalClose={() => setIsModalOpen(false)}
        editSkills={editSkills}
      />
    </Card>
  );
};

export default ProfileSkills;
