"use client";
import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";
import { AnalysisData } from "@/core/features/driver/assets/types/analysisDriverTs";
import { AlertCircle, CalendarCheck, TrendingUp, Users } from "lucide-react";

function BoxAnalysisDriver({ analysis }: { analysis: AnalysisData }) {
  return (
    <Card>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-t-primary">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>کل درخواست‌ها</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {analysis.requests.total.toLocaleString("fa-IR") || 0}
            </div>
            <TypographyP className="text-xs mt-1">
              {analysis.requests.today.toLocaleString("fa-IR") || 0} درخواست
              امروز
            </TypographyP>
          </CardContent>
        </Card>
        <Card className="border-t-secondary">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>نوبت‌های فعال</CardTitle>
            <CalendarCheck className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {analysis.appointments.scheduled.toLocaleString("fa-IR") || 0}
            </div>
            <TypographyP className="text-xs mt-1">
              {analysis.appointments.thisWeek.toLocaleString("fa-IR") || 0} نوبت
              این هفته
            </TypographyP>
          </CardContent>
        </Card>
        <Card className="border-t-success">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>نرخ تبدیل</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {analysis.conversion.rate || 0}%
            </div>
            <TypographyP className="text-xs mt-1">
              از{" "}
              {analysis.conversion.totalRequests.toLocaleString("fa-IR") || 0}{" "}
              درخواست
            </TypographyP>
          </CardContent>
        </Card>
        <Card className="border-t-destructive">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>میانگین رضایت</CardTitle>
            <AlertCircle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {analysis.appointments.averageScore || 0}
            </div>
            <TypographyP className="text-xs mt-1">از ۵ امتیاز ممکن</TypographyP>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

export default BoxAnalysisDriver;
