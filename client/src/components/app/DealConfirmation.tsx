import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";

const DealConfirmation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirm Exchange Details</CardTitle>
        <CardDescription>
          Review and confirm the terms of your skill exchange
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2 p-4 border rounded-lg">
              <Label className="text-emerald-600">Exchange Summary</Label>
              <p className="font-medium">
                Spanish Conversation ↔ Bicycle Repair
              </p>
              <p className="text-sm text-gray-600">
                1 hour Spanish practice per bike service
              </p>
            </div>
            <div className="space-y-2 p-4 border rounded-lg">
              <Label className="text-emerald-600">First Meeting</Label>
              <p className="font-medium">Saturday, June 10</p>
              <p className="text-sm text-gray-600">2:00 PM - 3:00 PM</p>
              <p className="text-sm text-gray-600">
                Central Park - 72nd St entrance
              </p>
            </div>
          </div>

          <div className="space-y-2 p-4 border rounded-lg">
            <Label className="text-emerald-600">Agreement</Label>
            <div className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
              </div>
              <label htmlFor="terms" className="text-sm">
                I agree to the terms of this skill exchange. Both parties
                understand this is not a monetary transaction but a mutual
                exchange of services.
              </label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button variant="outline">Request Changes</Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          Confirm Exchange
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DealConfirmation;
