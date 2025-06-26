import ChatSidebar from "@/components/app/ChatSidebar";
import ChatMessages from "@/components/app/ChatMessages";
import DealConfirmation from "@/components/app/DealConfirmation";
import { useState } from "react";

export default function ChatPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const onRefresh = () => {
    // send message
    setRefreshTrigger((prev) => prev + 1); // trigger refresh
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Chat List Sidebar */}
          <ChatSidebar refreshTrigger={refreshTrigger} />

          {/* Chat Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chat Messages */}
            <ChatMessages onRefresh={onRefresh} />

            {/* Deal Confirmation */}
            <DealConfirmation />
          </div>
        </div>
      </main>
    </div>
  );
}
