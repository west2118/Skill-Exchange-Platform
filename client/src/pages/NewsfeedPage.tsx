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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell as BellIcon } from "lucide-react";
import { Search as SearchIcon } from "lucide-react";
import { MapPin as MapPinIcon } from "lucide-react";
import { Filter as FilterIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewsfeedPage() {
  // Fake data
  const nearbyUsers = [
    {
      id: 1,
      name: "Sarah J.",
      distance: "0.5mi",
      offering: "Bicycle Repair",
      seeking: "Spanish Conversation",
      avatar: "/avatars/sarah.jpg",
      matchScore: 92,
    },
    {
      id: 2,
      name: "Michael T.",
      distance: "1.2mi",
      offering: "Guitar Lessons",
      seeking: "Help Moving",
      avatar: "/avatars/michael.jpg",
      matchScore: 87,
    },
    {
      id: 3,
      name: "Priya K.",
      distance: "0.8mi",
      offering: "Yoga Instruction",
      seeking: "Website Design",
      avatar: "/avatars/priya.jpg",
      matchScore: 95,
    },
  ];

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

  const notifications = [
    {
      id: 1,
      type: "match",
      message:
        "New match found: Alex wants to exchange Graphic Design for Car Maintenance",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      type: "message",
      message: "Sarah sent you a message about your Spanish tutoring offer",
      time: "15 min ago",
      read: true,
    },
    {
      id: 3,
      type: "exchange",
      message: "Your exchange with Michael is confirmed for tomorrow at 4pm",
      time: "1 hour ago",
      read: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      {/* <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-emerald-600">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="font-bold text-emerald-600">LocalLoop</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-9 w-[200px] md:w-[300px]"
                placeholder="Search skills or people..."
                type="search"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end">
                <div className="p-2 border-b">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`py-3 ${
                      !notification.read ? "bg-gray-50" : ""
                    }`}>
                    <div className="flex items-start space-x-3">
                      <div
                        className={`h-2 w-2 mt-1 rounded-full ${
                          !notification.read
                            ? "bg-emerald-600"
                            : "bg-transparent"
                        }`}></div>
                      <div>
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="text-center justify-center text-sm text-emerald-600 hover:bg-transparent">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Avatar>
              <AvatarImage src="/avatars/user.jpg" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header> */}

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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nearby">
              <MapPinIcon className="mr-2 h-4 w-4" />
              Nearby Users
            </TabsTrigger>
            <TabsTrigger value="skills">Skill Matches</TabsTrigger>
            <TabsTrigger value="mutual">Mutual Exchanges</TabsTrigger>
          </TabsList>

          {/* Nearby Users Tab */}
          <TabsContent value="nearby">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {nearbyUsers.map((user) => (
                <Card key={user.id}>
                  <CardHeader className="flex flex-row items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{user.name}</CardTitle>
                      <CardDescription>{user.distance} away</CardDescription>
                    </div>
                    <Badge className="ml-auto" variant="outline">
                      {user.matchScore}% match
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <Label>Offering</Label>
                        <p className="font-medium">{user.offering}</p>
                      </div>
                      <div>
                        <Label>Seeking</Label>
                        <p className="font-medium">{user.seeking}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">View Profile</Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Propose Exchange
                    </Button>
                  </CardFooter>
                </Card>
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
        </Tabs>
      </main>
    </div>
  );
}
