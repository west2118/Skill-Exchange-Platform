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
import type { FC } from "react";
import { toast } from "react-toastify";

type LocationStepProps = {
  isLoading: any;
  currentAddress: string;
  zipCode: string;
  handleCurrentLocation: () => void;
  nextStep: () => void;
  setZipCode: (zip: string) => void;
  setCurrentAddress: (zip: string) => void;
};

const LocationStep: FC<LocationStepProps> = ({
  isLoading,
  currentAddress,
  zipCode,
  handleCurrentLocation,
  nextStep,
  setZipCode,
  setCurrentAddress,
}) => {
  const handleNextStep = () => {
    if (zipCode.trim().length === 0 || currentAddress.trim().length === 0) {
      return toast.error("Both zip code and address are required");
    }

    nextStep();
  };

  return (
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
            <Label>Enter your ZIP code</Label>
            <Input
              id="zipcode"
              placeholder="e.g. 10001"
              className="mt-2"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div>
            <Label>Enter your Address</Label>
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
            onClick={handleNextStep}
            className="bg-emerald-600 hover:bg-emerald-700">
            Continue
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LocationStep;
