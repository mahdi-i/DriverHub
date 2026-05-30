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
import { toast } from "sonner";
import AccessDashboardItem from "../../ui/dashboard/AccessDashboardItem";
import PerformanceSummaryDashboard from "../../ui/dashboard/PerformanceSummaryDashboard";

async function DashboardDriverPage() {
  const license = await getAccessTokenSSR();

  const url = `${BASE_URL}/booking/incoming-requests?page=1&limit=5&sortBy=asc&filter.status=pending`;
  console.log("Request URL:", url);
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${license}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return toast.error(data.errors || `لطفا با تنظیمات دیگر تلاش کنید`);
  }
  const bookings: BookingRequest[] = data.data;

  return (
    <div className="space-y-6">
      <AccessDashboardItem />

      <TabelBookingDashboard bookings={bookings} />

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
    </div>
  );
}

export default DashboardDriverPage;
