import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin as MapPinIcon } from "lucide-react";
import { Filter as FilterIcon } from "lucide-react";
import { Link } from "react-router-dom";
import NearbyUserCard from "@/components/app/NearbyUserCard";
import { useSelector } from "react-redux";
import MyPostCard from "@/components/app/MyPostCard";
import ProposedModal from "@/components/app/ProposedModal";
import { useState } from "react";

export default function NewsfeedPage() {
  const skillMatches = [
    {
      id: 1,
      name: "Alex R.",
      offering: "Graphic Design",
      seeking: "Car Maintenance",
      match: "Your Car Maintenance ↔ Their Graphic Design",
      avatar: "/avatars/alex.jpg",
    },
    {
      id: 2,
      name: "Jamie L.",
      offering: "Home Cooking",
      seeking: "Gardening Help",
      match: "Your Gardening Help ↔ Their Home Cooking",
      avatar: "/avatars/jamie.jpg",
    },
    {
      id: 3,
      name: "Taylor M.",
      offering: "Photography",
      seeking: "Spanish Tutoring",
      match: "Your Spanish Tutoring ↔ Their Photography",
      avatar: "/avatars/taylor.jpg",
    },
  ];

  const mutualExchanges = [
    {
      id: 1,
      user1: "You",
      user2: "Sarah J.",
      exchange: "Bike Repair ↔ Spanish Lessons",
      status: "Completed",
      rating: "★★★★★",
    },
    {
      id: 2,
      user1: "You",
      user2: "Michael T.",
      exchange: "Guitar Lessons ↔ Furniture Assembly",
      status: "Upcoming",
      rating: "",
    },
    {
      id: 3,
      user1: "You",
      user2: "Priya K.",
      exchange: "Yoga Sessions ↔ Website Help",
      status: "Pending",
      rating: "",
    },
  ];

  const posts = useSelector((state: any) => state.post.posts);
  const currentUserId = useSelector((state: any) => state.user.currentUserId);

  const userPosts = posts?.filter((post: any) => post.userId === currentUserId);

  const nearbyPosts = posts?.filter(
    (post: any) => post.userId !== currentUserId
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Dashboard Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your LocalLoop Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <FilterIcon className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Link to="/create-exchange">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                + New Exchange
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="nearby" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="nearby">
              <MapPinIcon className="mr-2 h-4 w-4" />
              Nearby Users
            </TabsTrigger>
            <TabsTrigger value="skills">Skill Matches</TabsTrigger>
            <TabsTrigger value="mutual">Mutual Exchanges</TabsTrigger>
            <TabsTrigger value="my-post">My Posts</TabsTrigger>
          </TabsList>

          {/* Nearby Users Tab */}
          <TabsContent value="nearby">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {nearbyPosts.map((item: any) => (
                <NearbyUserCard key={item._id} item={item} />
              ))}
            </div>
          </TabsContent>

          {/* Skill Matches Tab */}
          <TabsContent value="skills">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {skillMatches.map((match) => (
                <Card key={match.id}>
                  <CardHeader className="flex flex-row items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={match.avatar} />
                      <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{match.name}</CardTitle>
                      <CardDescription>Perfect match!</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <Label>Potential Exchange</Label>
                        <p className="font-medium">{match.match}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Details</Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Start Exchange
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mutual Exchanges Tab */}
          <TabsContent value="mutual">
            <div className="space-y-4">
              {mutualExchanges.map((exchange) => (
                <Card key={exchange.id}>
                  <CardHeader>
                    <CardTitle>{exchange.exchange}</CardTitle>
                    <CardDescription>
                      Between {exchange.user1} and {exchange.user2}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          exchange.status === "Completed"
                            ? "default"
                            : "outline"
                        }>
                        {exchange.status}
                      </Badge>
                      <div className="text-yellow-500">{exchange.rating}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    {exchange.status === "Completed" && (
                      <Button variant="outline">Leave Review</Button>
                    )}
                    {exchange.status === "Upcoming" && (
                      <>
                        <Button variant="outline">Reschedule</Button>
                        <Button variant="destructive">Cancel</Button>
                      </>
                    )}
                    {exchange.status === "Pending" && (
                      <>
                        <Button variant="outline">Decline</Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          Confirm
                        </Button>
                      </>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Posts */}
          <TabsContent value="my-post">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {userPosts.map((item: any) => (
                <MyPostCard key={item._id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
