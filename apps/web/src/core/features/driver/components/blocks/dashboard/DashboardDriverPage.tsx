import { ModernBarChart } from "@/core/components/custom/ui/chart/BasicChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";
import { BookingRequest } from "@/core/features/booking/assets/types/bookingTs";
import { weeklyData } from "@/core/features/driver/assets/mock/analysis";
import TabelBookingDashboard from "@/core/features/driver/components/ui/bookings/TabelBookingDashboard";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { getAccessTokenSSR } from "@/core/lib/coockie/getAccess";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";
import AccessDashboardItem from "../../ui/dashboard/AccessDashboardItem";
import PerformanceSummaryDashboard from "../../ui/dashboard/PerformanceSummaryDashboard";
import DashboardDriverSkeleton from "./skeleton/DashboardDriverSkeleton";
const defaultBookings: BookingRequest[] = [];
async function DashboardDriverPage() {
  const license = await getAccessTokenSSR();
  if (!license) {
    redirect("/");
  }
  let bookings: BookingRequest[] = [];
  try {
    const res = await fetch(
      `${BASE_URL}/booking/incoming-requests?page=1&limit=5&sortBy=asc&filter.status=pending`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${license}`,
        },
      },
    );
    const data = await res.json();
    if (!res.ok) {
      let errorMessage = "خطا در دریافت درخواست‌ها";
      try {
        errorMessage = data.errors || data.message || errorMessage;
      } catch {
        errorMessage = `خطای سرور (${res.status})`;
      }

      toast.error(errorMessage);
      bookings = defaultBookings;
    } else {
      const result = await res.json();
      bookings = result.data || [];
    }
  } catch {
    bookings = defaultBookings;
  }

  return (
    <div className="space-y-6">
      <Suspense fallback={<DashboardDriverSkeleton />}>
        <AccessDashboardItem />
        <TabelBookingDashboard bookings={bookings} license={license} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>نوبت‌های هفتگی</CardTitle>
            </CardHeader>
            <CardContent>
              <ModernBarChart
                data={weeklyData}
                dataKey="count"
                fillColor="var(--color-primary)"
              />
            </CardContent>
          </Card>

          <PerformanceSummaryDashboard />
        </div>
      </Suspense>
    </div>
  );
}

export default DashboardDriverPage;
