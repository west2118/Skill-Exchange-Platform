import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectionProps = {
  constArray: string[];
  value: string;
  onChange: (value: string) => void;
};

const Selection = ({ constArray, value, onChange }: SelectionProps) => {
  return (
    <div className="w-full">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {constArray.includes("DIY Crafts") && (
            <SelectItem value="Specific Skill">Specific Skill</SelectItem>
          )}
          {constArray.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Selection;
