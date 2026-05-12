"use client";

import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";
import { apiDataanalysis } from "@/core/features/driver/assets/mock/analysis";
import { AlertCircle, CalendarCheck, TrendingUp, Users } from "lucide-react";
function BoxAnalysisDriver() {
  return (
    <Card>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-t-primary">
          <CardHeader className="flex flex-row items-center justify-between ">
            <CardTitle>کل درخواست‌ها</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {apiDataanalysis.requests.total.toLocaleString("fa-IR")}
            </div>
            <TypographyP className="text-xs mt-1">
              {apiDataanalysis.requests.today.toLocaleString("fa-IR")} درخواست
              امروز
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
              {apiDataanalysis.appointments.scheduled.toLocaleString("fa-IR")}
            </div>
            <TypographyP className="text-xs mt-1">
              {apiDataanalysis.appointments.thisWeek.toLocaleString("fa-IR")}{" "}
              نوبت این هفته
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
              {apiDataanalysis.conversion.rate}%
            </div>
            <TypographyP className="text-xs mt-1">
              از{" "}
              {apiDataanalysis.conversion.totalRequests.toLocaleString("fa-IR")}{" "}
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
              {apiDataanalysis.appointments.averageScore}
            </div>
            <TypographyP className="text-xs mt-1">از ۵ امتیاز ممکن</TypographyP>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

export default BoxAnalysisDriver;
