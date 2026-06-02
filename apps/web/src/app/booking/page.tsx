import BookingFilterComponnets from "@/core/features/booking/components/blocks/booking/BookingFilterComponnets";
import BookingPageSkeleton from "@/core/features/booking/components/ui/driver-card/skeleton/BookingPageSkeleton";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export default function page() {
  return (
    <Suspense fallback={<BookingPageSkeleton />}>
      <BookingFilterComponnets />
    </Suspense>
  );
}
