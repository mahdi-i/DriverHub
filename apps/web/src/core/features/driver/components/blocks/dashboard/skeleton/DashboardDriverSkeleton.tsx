import {
  Card,
  CardContent,
  CardHeader,
} from "@/core/components/shadcn/ui/card/card";
import BookingTableSkeleton from "@/core/features/booking/components/ui/skeleton/BookingTableSkeleton";

function DashboardDriverSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="h-6 w-24 bg-muted rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center py-2 rounded-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="p-3 rounded-full mb-3 bg-muted animate-pulse" />
                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <BookingTableSkeleton />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full bg-muted rounded animate-pulse" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-muted/30 rounded-lg"
              >
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                <div className="h-4 w-12 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardDriverSkeleton;
