import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";

import { Table } from "@/core/components/shadcn/ui/table/table";
import { BookingRequest } from "@/core/features/booking/assets/types/bookingTs";
import BodyTabelBookingDashboard from "./BodyTabelBookingDashboard";
import HeadTabelBookingDashboard from "./HeadTabelBookingDashboard";
function TabelBookingDashboard({
  bookings,
  license,
}: {
  bookings: BookingRequest[];
  license: string;
}) {
  return (
    <div className="mt-5">
      <Card>
        <CardContent className="p-0">
          <Table>
            <HeadTabelBookingDashboard />
            <BodyTabelBookingDashboard bookings={bookings} license={license} />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default TabelBookingDashboard;
