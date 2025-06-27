import { MessageSquare } from "lucide-react";
import React from "react";

const NoReviewCard = () => {
  return (
    <div className="rounded-lg border mx-6 p-6 text-center bg-white dark:bg-gray-900">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <MessageSquare className="h-6 w-6 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-medium">No Reviews Yet</h3>
    </div>
  );
};

export default NoReviewCard;
