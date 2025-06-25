import { Card, CardHeader, CardTitle } from "../ui/card";

const SuccessBanner = () => {
  return (
    <Card className="border-emerald-200 bg-emerald-50">
      <CardHeader className="text-center gap-0">
        <CardTitle className="text-emerald-800">
          Exchange Completed Successfully! 🎉
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default SuccessBanner;
