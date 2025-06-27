import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  Users,
  Flag,
  BarChart2,
  FileText,
  Shield,
  Settings,
  MessageSquare,
  Handshake,
  AlertCircle,
  UserCog,
} from "lucide-react";

const AdminSidebar = () => {
  return (
    <div className="hidden w-64 border-r bg-white dark:bg-gray-900 md:block">
      <div className="space-y-1 py-4">
        {/* Header */}
        <div className="px-6 pb-2">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Admin Dashboard
          </h1>
        </div>

        {/* User Management Section */}
        <details className="group">
          <summary className="flex items-center p-3 mx-2 rounded-lg hover:bg-accent cursor-pointer list-none">
            <Users className="w-5 h-5 mr-3 flex-shrink-0" />
            <span>User Management</span>
            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-open:rotate-90" />
          </summary>
          <div className="space-y-1 mt-1 ml-8">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              All Users
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <UserCog className="h-4 w-4" />
              User Permissions
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <AlertCircle className="h-4 w-4" />
              Reported Users
            </Button>
          </div>
        </details>

        {/* Exchange Posts Section */}
        <details className="group">
          <summary className="flex items-center p-3 mx-2 rounded-lg hover:bg-accent cursor-pointer list-none">
            <Handshake className="w-5 h-5 mr-3 flex-shrink-0" />
            <span>Exchange Posts</span>
            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-open:rotate-90" />
          </summary>
          <div className="space-y-1 mt-1 ml-8">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Handshake className="h-4 w-4" />
              All Exchanges
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Flag className="h-4 w-4" />
              Flagged Posts
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <MessageSquare className="h-4 w-4" />
              Post Comments
            </Button>
          </div>
        </details>

        {/* Reports & Moderation */}
        <details className="group">
          <summary className="flex items-center p-3 mx-2 rounded-lg hover:bg-accent cursor-pointer list-none">
            <FileText className="w-5 h-5 mr-3 flex-shrink-0" />
            <span>Reports & Moderation</span>
            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-open:rotate-90" />
          </summary>
          <div className="space-y-1 mt-1 ml-8">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              All Reports
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <AlertCircle className="h-4 w-4" />
              Urgent Reports
            </Button>
          </div>
        </details>

        {/* Analytics */}
        <details className="group">
          <summary className="flex items-center p-3 mx-2 rounded-lg hover:bg-accent cursor-pointer list-none">
            <BarChart2 className="w-5 h-5 mr-3 flex-shrink-0" />
            <span>Analytics</span>
            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-open:rotate-90" />
          </summary>
          <div className="space-y-1 mt-1 ml-8">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BarChart2 className="h-4 w-4" />
              Community Metrics
            </Button>
          </div>
        </details>

        {/* Admin Settings */}
        <details className="group">
          <summary className="flex items-center p-3 mx-2 rounded-lg hover:bg-accent cursor-pointer list-none">
            <Settings className="w-5 h-5 mr-3 flex-shrink-0" />
            <span>Admin Settings</span>
            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-open:rotate-90" />
          </summary>
          <div className="space-y-1 mt-1 ml-8">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              System Settings
            </Button>
          </div>
        </details>
      </div>
    </div>
  );
};

export default AdminSidebar;
