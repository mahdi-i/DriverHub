import { Paginations } from "@/core/components/custom/ui/pagination/Pagination";

import { DriversBookingsTs } from "@/core/features/booking/assets/types/driversBookingsTs";
import DriverBookingCard from "@/core/features/booking/components/ui/driver-card/DriverBookingCard";
import HeadBodyBookingResult from "./HeadBodyBookingResult";
const paginationFake = {
  total: 20,
  page: 10,
  limit: 5,
};

function BodyBookingResult({ bookings }: { bookings: DriversBookingsTs[] }) {
  return (
    <div className="flex-1 space-y-6">
      <HeadBodyBookingResult />

      <div className="space-y-4">
        {bookings.map((driver, index) => (
          <DriverBookingCard key={index} driver={driver} />
        ))}
      </div>
      <Paginations pagination={paginationFake} />
    </div>
  );
}

export default BodyBookingResult;
