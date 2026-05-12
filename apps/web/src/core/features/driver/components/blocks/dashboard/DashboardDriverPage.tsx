"use client";

import { ModernBarChart } from "@/core/components/custom/ui/chart/BasicChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";
import { weeklyData } from "@/core/features/driver/assets/mock/analysis";
import TabelBookingDashboard from "@/core/features/driver/components/ui/bookings/TabelBookingDashboard";
import AccessDashboardItem from "../../ui/dashboard/AccessDashboardItem";
import PerformanceSummaryDashboard from "../../ui/dashboard/PerformanceSummaryDashboard";

function DashboardDriverPage() {
  return (
    <div className="space-y-6">
      <AccessDashboardItem />

      <TabelBookingDashboard />

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
