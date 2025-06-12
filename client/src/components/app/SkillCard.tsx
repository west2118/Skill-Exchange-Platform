const SkillCard = ({ skill }: { skill: string }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
      <span className="font-medium">{skill}</span>
    </div>
  );
};

export default SkillCard;
