import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, ListTodo, MapPin, RefreshCw, Plus } from "lucide-react";

type NoDataCardProps = {
  variant:
    | "nearby-users"
    | "skill-matches"
    | "mutual-exchanges"
    | "my-posts"
    | "active-deals"
    | "completed-deals"
    | "cancelled-deals";
};

export function NoDataCard({ variant }: NoDataCardProps) {
  const config = {
    "nearby-users": {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "No Nearby Users Found",
      description:
        "We couldn't find any users in your area. Try expanding your search radius or check back later.",
      primaryAction: "Expand Search",
      secondaryAction: "Refresh",
    },
    "skill-matches": {
      icon: <Handshake className="h-6 w-6 text-primary" />,
      title: "No Skill Matches Found",
      description:
        "We couldn't find any matching skills. Consider adding more skills to your profile to get better matches.",
      primaryAction: "Add Skills",
      secondaryAction: "Refresh",
    },
    "mutual-exchanges": {
      icon: <Handshake className="h-6 w-6 text-primary" />,
      title: "No Mutual Exchanges",
      description:
        "You don't have any active exchanges. Start by finding users with matching skills.",
      primaryAction: "Find Matches",
      secondaryAction: "Refresh",
    },
    "my-posts": {
      icon: <ListTodo className="h-6 w-6 text-primary" />,
      title: "No Posts Created",
      description:
        "You haven't created any exchange posts yet. Create your first post to start exchanging skills.",
      primaryAction: "Create Post",
      secondaryAction: "Learn More",
    },
    "active-deals": {
      icon: <Handshake className="h-6 w-6 text-primary" />,
      title: "No Active Deals",
      description:
        "You currently have no ongoing exchanges. Start a new one to keep learning and sharing skills.",
      primaryAction: "Browse Skills",
      secondaryAction: "Refresh",
    },
    "completed-deals": {
      icon: <ListTodo className="h-6 w-6 text-primary" />,
      title: "No Completed Deals",
      description:
        "You haven't completed any skill exchanges yet. Once you finish one, it will show up here.",
      primaryAction: "View Active Deals",
      secondaryAction: "Learn More",
    },
    "cancelled-deals": {
      icon: <ListTodo className="h-6 w-6 text-primary" />,
      title: "No Cancelled Deals",
      description: "No deals have been cancelled so far. You’re doing great!",
      primaryAction: "Check Active Deals",
      secondaryAction: "Refresh",
    },
  };

  const currentConfig = config[variant];

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {currentConfig.icon}
          <h3 className="text-lg font-semibold">{currentConfig.title}</h3>
        </div>
      </CardHeader>

      <CardContent className="py-4">
        <p className="text-muted-foreground mb-6">
          {currentConfig.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            {currentConfig.primaryAction}
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            {currentConfig.secondaryAction}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
