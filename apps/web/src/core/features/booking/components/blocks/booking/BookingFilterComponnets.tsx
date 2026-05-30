"use client";
import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";

import BodyBookingResult from "@/core/features/booking/components/ui/filter/booking/body/BodyBookingResult";
import HeadFilterBooking from "@/core/features/booking/components/ui/filter/HeadFilterBooking";

function BookingFilterComponnets() {
  return (
    <SectionLayout>
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        <HeadFilterBooking />

        <BodyBookingResult />
      </div>
    </SectionLayout>
  );
}

export default BookingFilterComponnets;
