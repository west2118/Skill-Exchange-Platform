import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin as MapPinIcon } from "lucide-react";
import { Filter as FilterIcon } from "lucide-react";
import { Link } from "react-router-dom";
import NearbyTab from "./newsfeedTabs/NearbyTab";
import MyPostTab from "./newsfeedTabs/MyPostTab";
import MutualExchangeTab from "./newsfeedTabs/MutualExchangeTab";
import MatchedPost from "./newsfeedTabs/MatchedPost";

export default function NewsfeedPage() {
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
          <NearbyTab />

          {/* Skill Matches Tab */}
          <MatchedPost />

          {/* Mutual Exchanges Tab */}
          <MutualExchangeTab />

          {/* My Posts */}
          <MyPostTab />
        </Tabs>
      </main>
    </div>
  );
}
