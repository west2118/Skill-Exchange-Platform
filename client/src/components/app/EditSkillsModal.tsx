import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { skills } from "@/constants/skills";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { privateApi } from "@/utils/axios";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/userSlice";

type EditSkillsModalProps = {
  isModalOpen: boolean;
  editType: string | null;
  onModalClose: () => void;
  editSkills: string[];
};

export function EditSkillsModal({
  isModalOpen,
  editType,
  onModalClose,
  editSkills,
}: EditSkillsModalProps) {
  const dispatch = useDispatch();
  const [otherSkill, setOtherSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const token = useAppSelector((state) => state.user.currentUserToken);
  const currentUserId = useAppSelector((state) => state.user.currentUserId);

  useEffect(() => {
    if (isModalOpen && editSkills) {
      setSelectedSkills(editSkills);
    }
  }, [isModalOpen, editSkills]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  const handleAddOtherSkill = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleCloseModal = () => {
    onModalClose();
    setSelectedSkills([]);
    setOtherSkill("");
  };

  const handleSubmit = async () => {
    if (!selectedSkills) {
      return toast.error("Selected skills can't be empty");
    }

    try {
      let response;
      if (editType === "offer") {
        response = await privateApi.put(
          `http://localhost:8080/api/edit-offered/${currentUserId}`,
          { offeredSkills: selectedSkills },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await privateApi.put(
          `http://localhost:8080/api/edit-seeked/${currentUserId}`,
          { seekedSkills: selectedSkills },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      const data = response?.data;

      dispatch(
        updateUser({ userId: currentUserId, newData: data?.updatedUser })
      );
      toast.success(data?.message);
      onModalClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (!isModalOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      onClick={handleCloseModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-lg bg-white dark:bg-gray-900 shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-start p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">
              Edit Your {editType === "offer" ? "Offered" : "Seeked"} Skills
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Update what skills or services you can provide to others
            </p>
          </div>
          <button
            onClick={handleCloseModal}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          {/* Selected Skills Display */}
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>

          {/* Skills Checkboxes */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={`offer-${skill.toLowerCase().replace(/ /g, "-")}`}
                  checked={selectedSkills.includes(skill)}
                  onCheckedChange={(checked) => {
                    setSelectedSkills((prev) =>
                      checked
                        ? [...prev, skill]
                        : prev.filter((item) => item !== skill)
                    );
                  }}
                />
                <Label
                  htmlFor={`offer-${skill.toLowerCase().replace(/ /g, "-")}`}>
                  {skill}
                </Label>
              </div>
            ))}
          </div>

          {/* Other Skills Input */}
          <form
            onSubmit={handleAddOtherSkill}
            className="flex items-end gap-2 pt-2">
            <div className="flex flex-col flex-1 gap-2">
              <Label>Other Skills</Label>
              <Input
                placeholder="e.g. Cooking, Painting"
                value={otherSkill}
                onChange={(e) => setOtherSkill(e.target.value)}
              />
            </div>
            <Button type="submit" variant="default">
              Add
            </Button>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 rounded-b-lg flex justify-between">
          <Button onClick={handleCloseModal} type="button" variant="ghost">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="default">
            Save Changes
          </Button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
