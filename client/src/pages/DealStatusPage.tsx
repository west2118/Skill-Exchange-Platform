import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import ActiveDealTab from "./dealsTabs/ActiveDealTab";
import CompletedDealTab from "./dealsTabs/CompletedDealTab";
import CancelledDealTab from "./dealsTabs/CancelledDealTab";

export default function DealStatusPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Your Skill Exchanges
          </h1>
          <p className="mt-2 text-gray-600">
            Track all your active, completed, and past deals
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled/Expired</TabsTrigger>
          </TabsList>

          {/* Active Deals Tab */}
          <ActiveDealTab />

          {/* Completed Deals Tab */}
          <CompletedDealTab />

          {/* Cancelled/Expired Deals Tab */}
          <CancelledDealTab />
        </Tabs>
      </main>
    </div>
  );
}
