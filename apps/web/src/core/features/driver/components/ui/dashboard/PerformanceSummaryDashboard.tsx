import { TypographySpan } from "@/core/components/custom/ui/typography/Typography";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";

function PerformanceSummaryDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          خلاصه عملکرد
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
          <TypographySpan>کلاس‌های انجام شده</TypographySpan>
          <TypographySpan>12</TypographySpan>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
          <TypographySpan>امتیاز رضایت</TypographySpan>
          <TypographySpan>123/2</TypographySpan>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
          <TypographySpan>درآمد ماهانه</TypographySpan>
          <TypographySpan>500000 ت</TypographySpan>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
          <TypographySpan>درآمد ماهانه</TypographySpan>
          <TypographySpan>60000 ت</TypographySpan>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
          <TypographySpan>درآمد ماهانه</TypographySpan>
          <TypographySpan>700000 ت</TypographySpan>
        </div>
      </CardContent>
    </Card>
  );
}

export default PerformanceSummaryDashboard;
