import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section - better centered */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <Badge
            variant="outline"
            className="border-emerald-200 bg-emerald-50 text-emerald-600">
            Community Skill Exchange
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Trade Skills, Not Cash <br /> in Your Neighborhood
          </h1>
          <p className="max-w-[700px] text-lg text-gray-600">
            LocalLoop connects people who want to exchange services within their
            community. Fix a bike, learn a language, or get help with gardening
            - all through skill sharing.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works - better grid layout */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How LocalLoop Works
          </h2>
          <p className="mt-4 text-gray-600">
            It's simple to start exchanging skills with your neighbors
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          <Card className="h-full">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <span className="text-2xl">1</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>Create a Profile</CardTitle>
              <CardDescription className="mt-2">
                List the skills you can offer and what you'd like to learn from
                others in your community.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <span className="text-2xl">2</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>Find Matches</CardTitle>
              <CardDescription className="mt-2">
                Browse or search for skill exchanges that match your interests
                and location.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <span className="text-2xl">3</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>Connect & Exchange</CardTitle>
              <CardDescription className="mt-2">
                Message other members, arrange meetups, and exchange skills
                without money changing hands.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Exchanges - better grid constraints */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Recent Exchanges
          </h2>
          <p className="mt-4 text-gray-600">
            See what skills people in your area are offering and requesting
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100"></div>
                <div>
                  <CardTitle>Sarah J.</CardTitle>
                  <CardDescription>0.5mi away</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <Label>Offering</Label>
                  <p className="font-medium">Bicycle Repair</p>
                </div>
                <div>
                  <Label>Seeking</Label>
                  <p className="font-medium">Spanish Conversation Practice</p>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100"></div>
                <div>
                  <CardTitle>Michael T.</CardTitle>
                  <CardDescription>1.2mi away</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <Label>Offering</Label>
                  <p className="font-medium">Guitar Lessons</p>
                </div>
                <div>
                  <Label>Seeking</Label>
                  <p className="font-medium">Help Moving Furniture</p>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100"></div>
                <div>
                  <CardTitle>Priya K.</CardTitle>
                  <CardDescription>0.8mi away</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <Label>Offering</Label>
                  <p className="font-medium">Yoga Instruction</p>
                </div>
                <div>
                  <Label>Seeking</Label>
                  <p className="font-medium">Website Design Help</p>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section - full width but content centered */}
      <section className="w-full bg-emerald-600 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Start Exchanging Skills?
            </h2>
            <p className="mt-4 text-emerald-100">
              Join LocalLoop today and discover the talents in your community
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-emerald-600 hover:bg-gray-100">
                Sign Up Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white bg-emerald-700 hover:text-emerald-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
