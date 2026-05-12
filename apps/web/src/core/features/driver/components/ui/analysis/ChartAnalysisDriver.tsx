"use client";
import {
  ModernBarChart,
  ModernLineChart,
} from "@/core/components/custom/ui/chart/BasicChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";
import {
  monthlyData,
  weeklyData,
} from "@/core/features/driver/assets/mock/analysis";
function ChartAnalysisDriver() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
      <Card>
        <CardHeader>
          <CardTitle>روند درآمد</CardTitle>
        </CardHeader>
        <CardContent>
          <ModernLineChart
            data={monthlyData}
            dataKey="amount"
            strokeColor="var(--color-primary)"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>نوبت‌های هفتگی</CardTitle>
        </CardHeader>
        <CardContent>
          <ModernBarChart
            data={weeklyData}
            dataKey="count"
            fillColor="var(--color-secondary)"
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default ChartAnalysisDriver;
