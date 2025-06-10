import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Onboarding Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome to LocalLoop
            </h1>
            <p className="mt-2 text-gray-600">
              Let's set up your profile so you can start exchanging skills in
              your community.
            </p>
            <div className="mt-4 flex items-center justify-center">
              <Progress value={33} className="w-[400px]" />
            </div>
          </div>

          {/* Location Step */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Step 1: Set Your Location</CardTitle>
              <CardDescription>
                This helps us match you with people nearby.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="zipcode">Enter your ZIP code</Label>
                  <Input
                    id="zipcode"
                    placeholder="e.g. 10001"
                    className="mt-2"
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
                <Button variant="outline" className="w-full">
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
                </Button>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 px-6 py-4">
              <div className="flex w-full justify-between">
                <Button variant="ghost" disabled>
                  Back
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Continue
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Skills Selection - Offering */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Step 2: Select Skills You Can Offer</CardTitle>
              <CardDescription>
                What skills or services can you provide to others?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">Bicycle Repair</Badge>
                  <Badge variant="secondary">Gardening</Badge>
                  <Badge variant="secondary">Spanish Tutoring</Badge>
                  <Badge variant="secondary">Graphic Design</Badge>
                  <Badge variant="secondary">Home Cooking</Badge>
                  <Badge variant="secondary">Yoga Instruction</Badge>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    "Bicycle Repair",
                    "Gardening Help",
                    "Language Tutoring",
                    "Graphic Design",
                    "Cooking/Baking",
                    "Yoga/Fitness Training",
                    "Home Organization",
                    "Pet Care",
                    "Computer Help",
                    "Music Lessons",
                    "Photography",
                    "Car Maintenance",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`offer-${skill.toLowerCase().replace(/ /g, "-")}`}
                      />
                      <label
                        htmlFor={`offer-${skill
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 px-6 py-4">
              <div className="flex w-full justify-between">
                <Button variant="ghost">Back</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Continue
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Skills Selection - Seeking */}
          <Card>
            <CardHeader>
              <CardTitle>Step 3: Select Skills You Want to Learn</CardTitle>
              <CardDescription>
                What skills or services would you like to receive from others?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">Spanish</Badge>
                  <Badge variant="secondary">Guitar</Badge>
                  <Badge variant="secondary">Home Repair</Badge>
                  <Badge variant="secondary">Web Development</Badge>
                  <Badge variant="secondary">Knitting</Badge>
                  <Badge variant="secondary">Car Maintenance</Badge>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    "Spanish Language",
                    "Guitar Lessons",
                    "Home Repair",
                    "Web Development",
                    "Knitting/Crochet",
                    "Car Maintenance",
                    "Photography",
                    "Graphic Design",
                    "Yoga Instruction",
                    "Meditation Guidance",
                    "Financial Planning",
                    "DIY Crafts",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`seek-${skill.toLowerCase().replace(/ /g, "-")}`}
                      />
                      <label
                        htmlFor={`seek-${skill
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 px-6 py-4">
              <div className="flex w-full justify-between">
                <Button variant="ghost">Back</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Complete Profile
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
