import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";

function HeadBookingDashboardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-16 bg-muted rounded animate-pulse" />
              <div className="h-10 w-full bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default HeadBookingDashboardSkeleton;
