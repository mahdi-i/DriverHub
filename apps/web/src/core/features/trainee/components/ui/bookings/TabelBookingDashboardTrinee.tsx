import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";

import { Table } from "@/core/components/shadcn/ui/table/table";
import BodyTabelBookingDashboardTrainee from "./BodyTabelBookingDashboardTrainee";
import HeadTabelBookingDashboardTrainee from "./HeadTabelBookingDashboardTrainee";

function TabelBookingDashboardTrinee() {
  return (
    <div className="mt-5">
      <Card>
        <CardContent className="p-0">
          <Table>
            <HeadTabelBookingDashboardTrainee />
            <BodyTabelBookingDashboardTrainee />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default TabelBookingDashboardTrinee;
