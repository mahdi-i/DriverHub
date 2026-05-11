"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";
import { schedules } from "../../../assets/mock/schedules";
import ScheduleTable from "./ScheduleTable";

function TabelScheduleDriver() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>جدول روزهای کاری</CardTitle>
      </CardHeader>

      <CardContent>
        <ScheduleTable schedules={schedules} />
      </CardContent>
    </Card>
  );
}

export default TabelScheduleDriver;
