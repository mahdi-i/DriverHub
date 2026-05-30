import BookingDashboardDriver from "@/core/features/driver/components/blocks/bookings/BookingDashboardDriver";

function page({ searchParams }) {
  return <BookingDashboardDriver searchParams={searchParams} />;
}

export default page;
