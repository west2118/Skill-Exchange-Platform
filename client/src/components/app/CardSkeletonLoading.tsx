// components/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { TabsContent } from "@radix-ui/react-tabs";

type CardSkeletonLoadingProps = {
  count: number;
  tabValue: string;
};

export function CardSkeletonLoading({
  count,
  tabValue,
}: CardSkeletonLoadingProps) {
  return (
    <TabsContent value={tabValue}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Skeleton className="h-3 w-[100px] mb-1" />
                  <Skeleton className="h-4 w-[180px]" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-32 bg-emerald-600/20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
}
