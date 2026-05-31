import {
  Card,
  CardContent,
  CardHeader,
} from "@/core/components/shadcn/ui/card/card";

function AnalysisDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {[1, 2, 3, 4].map((_, index) => (
            <Card key={index} className="border-t-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                <div className="h-4 w-4 bg-muted rounded-full animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted rounded animate-pulse mb-2" />
                <div className="h-3 w-32 bg-muted rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            <div className="h-6 w-40 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full bg-muted rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AnalysisDashboardSkeleton;
