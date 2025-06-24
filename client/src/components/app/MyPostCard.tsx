import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { PostDetailsModal } from "./PostDetailsModal";
import { useState } from "react";
import { Link } from "react-router-dom";

const MyPostCard = ({ item }: any) => {
  const users = useSelector((state: any) => state.user.users);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState<boolean>(false);

  const user = users.find((user: any) => item.userId === user._id);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-x-4">
        <div className="flex flex-row items-center space-x-4">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Me</CardTitle>
            <CardDescription className="mt-1">
              {user?.location?.address.slice(0, 30)}...
            </CardDescription>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-gray-100">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 z-50">
            {" "}
            {/* Added z-index */}
            <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600">
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/edit-exchange/${item._id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Cancel Post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <Label>Offering</Label>
            <p className="font-medium">{item?.skillOffer}</p>
          </div>
          <div>
            <Label>Seeking</Label>
            <p className="font-medium">{item?.skillSeek}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex items-center justify-between">
          <Button
            onClick={() => setIsModalDetailsOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700">
            View Details
          </Button>
          <Badge variant={item.status === "Exchanged" ? "default" : "outline"}>
            {item.status}
          </Badge>
        </div>
      </CardFooter>

      <PostDetailsModal
        isModalDetailsOpen={isModalDetailsOpen}
        isClose={() => setIsModalDetailsOpen(false)}
        item={item}
        user={user}
      />
    </Card>
  );
};

export default MyPostCard;
