"use client";

import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";

import { Table } from "@/core/components/shadcn/ui/table/table";
import BodyTabelBookingDashboard from "./BodyTabelBookingDashboard";
import HeadTabelBookingDashboard from "./HeadTabelBookingDashboard";
function TabelBookingDashboard() {
  return (
    <div className="mt-5">
      <Card>
        <CardContent className="p-0">
          <Table>
            <HeadTabelBookingDashboard />
            <BodyTabelBookingDashboard />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default TabelBookingDashboard;
