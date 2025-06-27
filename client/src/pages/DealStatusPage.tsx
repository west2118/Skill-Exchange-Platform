import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveDealTab from "./dealsTabs/ActiveDealTab";
import CompletedDealTab from "./dealsTabs/CompletedDealTab";
import CancelledDealTab from "./dealsTabs/CancelledDealTab";
import { useSearchParams } from "react-router-dom";

export default function DealStatusPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "active";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

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
        <Tabs value={tab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled/Expired</TabsTrigger>
          </TabsList>

          {tab === "active" && <ActiveDealTab />}
          {tab === "completed" && <CompletedDealTab />}
          {tab === "cancelled" && <CancelledDealTab />}
        </Tabs>
      </main>
    </div>
  );
}
