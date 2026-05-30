import { Paginations } from "@/core/components/custom/ui/pagination/Pagination";

import { mockBookingDrivers } from "@/core/features/booking/assets/mock/bookingDriver";
import DriverBookingCard from "@/core/features/booking/components/ui/driver-card/DriverBookingCard";
import HeadBodyBookingResult from "./HeadBodyBookingResult";
const paginationFake = {
  total: 20,
  page: 10,
  limit: 5,
};

function BodyBookingResult() {
  return (
    <div className="flex-1 space-y-6">
      <HeadBodyBookingResult />

      <div className="space-y-4">
        {mockBookingDrivers.map((driver) => (
          <DriverBookingCard key={driver.id} driver={driver} />
        ))}
      </div>
      <Paginations pagination={paginationFake} />
    </div>
  );
}

export default BodyBookingResult;
