"use client";
import {
  ModernBarChart,
  ModernLineChart,
} from "@/core/components/custom/ui/chart/BasicChart";
import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";
import { AlertCircle, CalendarCheck, TrendingUp, Users } from "lucide-react";

const apiData = {
  requests: {
    total: 1250,
    pending: 45,
    rejected: 12,
    today: 28,
    thisWeek: 156,
    thisMonth: 640,
  },
  appointments: {
    total: 980,
    scheduled: 120,
    completed: 860,
    cancelled: 15,
    averageScore: 4.8,
    today: 15,
    thisWeek: 85,
    thisMonth: 320,
  },
  conversion: {
    rate: 78.5,
    totalRequests: 1250,
    totalAppointments: 980,
  },
};

const monthlyData = [
  { name: "فروردین", amount: 4000 },
  { name: "اردیبهشت", amount: 3000 },
  { name: "خرداد", amount: 5000 },
  { name: "تیر", amount: 4500 },
  { name: "مرداد", amount: 6000 },
  { name: "شهریور", amount: 5500 },
  { name: "مهر", amount: 7000 },
  { name: "آبان", amount: 6500 },
  { name: "آذر", amount: 8000 },
  { name: "دی", amount: 7500 },
  { name: "بهمن", amount: 9000 },
  { name: "اسفند", amount: 8500 },
];

const weeklyData = [
  { name: "شنبه", count: 120 },
  { name: "یکشنبه", count: 90 },
  { name: "دوشنبه", count: 150 },
  { name: "سه‌شنبه", count: 180 },
  { name: "چهارشنبه", count: 160 },
  { name: "پنجشنبه", count: 200 },
  { name: "جمعه", count: 250 },
];
function page() {
  return (
    <>
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-t-primary">
            <CardHeader className="flex flex-row items-center justify-between ">
              <CardTitle>کل درخواست‌ها</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {apiData.requests.total.toLocaleString("fa-IR")}
              </div>
              <TypographyP className="text-xs mt-1">
                {apiData.requests.today.toLocaleString("fa-IR")} درخواست امروز
              </TypographyP>
            </CardContent>
          </Card>

          <Card className="border-t-secondary">
            <CardHeader className="flex flex-row items-center justify-between ">
              <CardTitle>نوبت‌های فعال</CardTitle>
              <CalendarCheck className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">
                {apiData.appointments.scheduled.toLocaleString("fa-IR")}
              </div>
              <TypographyP className="text-xs mt-1">
                {apiData.appointments.thisWeek.toLocaleString("fa-IR")} نوبت این
                هفته
              </TypographyP>
            </CardContent>
          </Card>

          <Card className="border-t-success">
            <CardHeader className="flex flex-row items-center justify-between ">
              <CardTitle>نرخ تبدیل</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {apiData.conversion.rate}%
              </div>
              <TypographyP className="text-xs mt-1">
                از {apiData.conversion.totalRequests.toLocaleString("fa-IR")}{" "}
                درخواست
              </TypographyP>
            </CardContent>
          </Card>

          <Card className="border-t-destructive">
            <CardHeader className="flex flex-row items-center justify-between ">
              <CardTitle>میانگین رضایت</CardTitle>
              <AlertCircle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {apiData.appointments.averageScore}
              </div>
              <TypographyP className="text-xs mt-1">
                از ۵ امتیاز ممکن
              </TypographyP>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

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
    </>
  );
}

export default DashboardPage;
