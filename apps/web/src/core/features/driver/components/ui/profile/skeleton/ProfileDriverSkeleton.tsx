import {
  Card,
  CardContent,
  CardHeader,
} from "@/core/components/shadcn/ui/card/card";

function ProfileDriverSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="h-10 w-32 bg-muted rounded animate-pulse" />
      </div>

      <Card>
        <CardContent className="flex flex-col md:flex-row justify-between items-center gap-4 p-6">
          <div className="flex items-center gap-4">
            <div className="h-17.5 w-17.5 rounded-full bg-muted animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="h-6 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="h-8 w-24 bg-muted rounded animate-pulse" />
            <div className="h-8 w-24 bg-muted rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="md:w-[70%] w-full p-4">
          <div className="h-6 w-32 bg-muted rounded animate-pulse mb-4 px-2" />
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 p-0">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                <div className="h-6 w-24 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground border-primary w-full md:w-[40%] p-4">
          <CardHeader className="flex flex-row items-center justify-between w-full p-0 mb-2">
            <div className="h-6 w-32 bg-white/20 rounded animate-pulse" />
            <div className="h-6 w-6 bg-white/20 rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-4 w-32 bg-white/20 rounded animate-pulse" />
              <div className="h-6 w-48 bg-white/20 rounded animate-pulse mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="flex flex-col md:flex-row items-start gap-6 p-6">
          <div className="w-full md:w-1/3 space-y-4">
            <div className="h-32 w-full bg-muted rounded animate-pulse" />
            <div className="h-10 w-full bg-muted rounded animate-pulse" />
          </div>

          <div className="w-full md:w-2/3">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-6 w-32 bg-muted rounded animate-pulse" />
              <div className="h-8 w-8 bg-muted rounded-full animate-pulse" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                  <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileDriverSkeleton;
