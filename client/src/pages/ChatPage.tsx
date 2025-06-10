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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Chat List Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Your Conversations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
              {/* Conversation 1 - Active */}
              <div className="border-b p-4 hover:bg-gray-50 cursor-pointer bg-gray-50">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/avatars/sarah.jpg" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="font-medium truncate">Sarah Johnson</p>
                      <span className="text-xs text-gray-500">2 min ago</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      Sounds great! Let's meet Saturday at 2pm
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-1 border-emerald-200 bg-emerald-50 text-emerald-600">
                      Bike Repair ↔ Spanish
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Conversation 2 */}
              <div className="border-b p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/avatars/michael.jpg" />
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="font-medium truncate">Michael T.</p>
                      <span className="text-xs text-gray-500">1 hr ago</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      I can do Wednesday evening if that works
                    </p>
                    <Badge variant="outline" className="mt-1">
                      Guitar Lessons ↔ Moving Help
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Conversation 3 */}
              <div className="border-b p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/avatars/priya.jpg" />
                    <AvatarFallback>PK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="font-medium truncate">Priya K.</p>
                      <span className="text-xs text-gray-500">3 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      Thanks for the yoga session!
                    </p>
                    <Badge variant="outline" className="mt-1">
                      Yoga ↔ Website Help
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exchange Details Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Proposed Exchange</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2 p-4 border rounded-lg">
                    <Label className="text-emerald-600">You Provide</Label>
                    <p className="font-medium">Spanish Conversation Practice</p>
                    <p className="text-sm text-gray-600">1 hour per week</p>
                    <div className="mt-2">
                      <Label>Availability</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline">Weekends</Badge>
                        <Badge variant="outline">Evenings</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 p-4 border rounded-lg">
                    <Label className="text-emerald-600">Sarah Provides</Label>
                    <p className="font-medium">Bicycle Repair Services</p>
                    <p className="text-sm text-gray-600">As needed</p>
                    <div className="mt-2">
                      <Label>Availability</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline">Weekends</Badge>
                        <Badge variant="outline">Afternoons</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chat Messages */}
            <Card>
              <CardHeader className="border-b">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/avatars/sarah.jpg" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Sarah Johnson</CardTitle>
                    <CardDescription>Bike Repair ↔ Spanish</CardDescription>
                  </div>
                  <Badge className="ml-auto">Pending Confirmation</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Message 1 */}
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/sarah.jpg" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="rounded-lg bg-gray-100 p-4">
                      <p>
                        Hi there! I saw your post about Spanish conversation
                        practice. I'd be happy to help with your bike in
                        exchange.
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Sarah - June 5, 10:23 AM
                    </p>
                  </div>
                </div>

                {/* Message 2 */}
                <div className="flex items-start space-x-3 justify-end">
                  <div className="order-1">
                    <div className="rounded-lg bg-emerald-600 text-white p-4">
                      <p>
                        Hi Sarah! That sounds perfect. What kind of bike issues
                        are you comfortable working on?
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 text-right">
                      You - June 5, 10:45 AM
                    </p>
                  </div>
                  <Avatar className="h-8 w-8 order-2">
                    <AvatarImage src="/avatars/user.jpg" />
                    <AvatarFallback>YO</AvatarFallback>
                  </Avatar>
                </div>

                {/* Message 3 */}
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/sarah.jpg" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="rounded-lg bg-gray-100 p-4">
                      <p>
                        I can handle most common issues - flat tires, brake
                        adjustments, gear tuning, etc. I have all the tools
                        needed.
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Sarah - June 5, 11:02 AM
                    </p>
                  </div>
                </div>

                {/* Message 4 */}
                <div className="flex items-start space-x-3 justify-end">
                  <div className="order-1">
                    <div className="rounded-lg bg-emerald-600 text-white p-4">
                      <p>
                        Great! I need my brakes looked at and maybe the gears
                        adjusted. When would you be available to meet?
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 text-right">
                      You - June 5, 11:15 AM
                    </p>
                  </div>
                  <Avatar className="h-8 w-8 order-2">
                    <AvatarImage src="/avatars/user.jpg" />
                    <AvatarFallback>YO</AvatarFallback>
                  </Avatar>
                </div>

                {/* Message 5 */}
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/sarah.jpg" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="rounded-lg bg-gray-100 p-4">
                      <p>
                        I'm free this Saturday afternoon. We could meet at
                        Central Park near the 72nd St entrance? I can look at
                        your bike while we chat in Spanish.
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Sarah - June 5, 11:30 AM
                    </p>
                  </div>
                </div>

                {/* Message 6 */}
                <div className="flex items-start space-x-3 justify-end">
                  <div className="order-1">
                    <div className="rounded-lg bg-emerald-600 text-white p-4">
                      <p>
                        Sounds perfect! Let's say Saturday at 2pm? I'll bring my
                        bike and we can do about an hour of Spanish conversation
                        while you work on it.
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 text-right">
                      You - June 5, 11:45 AM
                    </p>
                  </div>
                  <Avatar className="h-8 w-8 order-2">
                    <AvatarImage src="/avatars/user.jpg" />
                    <AvatarFallback>YO</AvatarFallback>
                  </Avatar>
                </div>

                {/* Message 7 */}
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/sarah.jpg" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="rounded-lg bg-gray-100 p-4">
                      <p>
                        Sounds great! Let's meet Saturday at 2pm. I'll confirm
                        with you Friday evening to make sure we're still on.
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Sarah - June 5, 11:50 AM
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Send
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Deal Confirmation */}
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
                      <Label className="text-emerald-600">
                        Exchange Summary
                      </Label>
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
                        I agree to the terms of this skill exchange. Both
                        parties understand this is not a monetary transaction
                        but a mutual exchange of services.
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
          </div>
        </div>
      </main>
    </div>
  );
}
