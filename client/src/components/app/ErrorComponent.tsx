import { TabsContent } from "@radix-ui/react-tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ErrorComponentProps {
  message: string;
}

export const ErrorComponent = ({ message }: ErrorComponentProps) => (
  <TabsContent value="skills">
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error loading matches</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={() => window.location.reload()}
          className="text-sm font-medium underline-offset-4 hover:underline">
          Try again
        </button>
      </AlertDescription>
    </Alert>
  </TabsContent>
);
