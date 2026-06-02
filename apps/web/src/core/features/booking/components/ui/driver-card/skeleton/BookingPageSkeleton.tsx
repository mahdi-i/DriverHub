import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/core/components/shadcn/ui/card/card";
import { Skeleton } from "@/core/components/shadcn/ui/skeleton/skeleton";

export default function BookingPageSkeleton() {
  return (
    <SectionLayout>
      <div className="flex flex-col lg:flex-row gap-6 h-full p-4 lg:p-6">
        <aside className="hidden lg:block w-[320px] shrink-0">
          <Card>
            <CardHeader className="border-b pb-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-7 w-28" />
                <Skeleton className="h-5 w-24" />
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-8">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>

              <div className="h-px w-full bg-border" />

              <div className="space-y-5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Skeleton key={j} className="h-8 w-20 rounded-full" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px w-full bg-border" />

              <div className="space-y-5">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                ))}
              </div>

              <Skeleton className="h-11 w-full rounded-lg" />
            </CardContent>
          </Card>
        </aside>

        <div className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-20" />
              <div className="flex items-center gap-1 bg-muted/30 border border-border rounded-full p-1">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-6 w-px bg-border" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-6 w-px bg-border" />
                <Skeleton className="h-8 w-28 rounded-full" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-9 w-28 rounded-full" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </div>

          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex gap-4 flex-1">
                      <Skeleton className="h-16 w-16 rounded-full shrink-0" />

                      <div className="space-y-3 flex-1 pt-1">
                        <Skeleton className="h-6 w-56" />
                        <div className="flex gap-4">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-28" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-3 pt-4 sm:pt-0">
                      <Skeleton className="h-10 w-full sm:w-32 rounded-lg" />
                      <Skeleton className="h-10 w-full sm:w-32 rounded-lg" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
