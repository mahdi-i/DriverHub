import {
  Card,
  CardContent,
  CardHeader,
} from "@/core/components/shadcn/ui/card/card";

function ProfileTraineeSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="h-10 w-32 bg-muted rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden border-none shadow-sm bg-linear-to-br from-white to-gray-50 py-0">
            <div className="h-14 bg-muted rounded-t-lg animate-pulse" />
            <CardContent className="p-0">
              <div className="relative px-6 pb-6">
                <div className="absolute -top-12 left-6">
                  <div className="h-17.5 w-17.5 rounded-full bg-muted animate-pulse" />
                </div>
                <div className="pt-14">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                      <div className="h-6 w-40 bg-muted rounded animate-pulse" />
                      <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                    </div>
                    <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
                  </div>

                  <div className="space-y-3">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-secondary-foreground">
            <CardHeader className="pb-3">
              <div className="h-5 w-32 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none">
            <CardHeader>
              <div className="h-6 w-48 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                    <div className="h-12 w-full bg-muted rounded-sm animate-pulse" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none">
            <CardHeader>
              <div className="h-6 w-56 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-12 w-full bg-muted rounded-sm animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                  <div className="h-12 w-full bg-muted rounded-sm animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-28 bg-muted rounded animate-pulse" />
                  <div className="h-12 w-full bg-muted rounded-sm animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProfileTraineeSkeleton;
