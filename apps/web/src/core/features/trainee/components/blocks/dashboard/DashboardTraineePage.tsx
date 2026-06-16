import { BookingRequest } from "@/core/features/booking/assets/types/bookingTs";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { getAccessTokenSSR } from "@/core/lib/coockie/getAccess";
import { getErrorMessage } from "@/core/utils/getErrorMessage";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import TableBookingTrainee from "../../ui/bookings/TabelBookingDashboardTrinee";
import AccessDashboardItemTrainee from "../../ui/dashboard/AccessDashboardItemTrainee";
const defaultBookings: BookingRequest[] = [];

async function DashboardTraineePage() {
  const license = await getAccessTokenSSR();
  if (!license) {
    redirect("/");
  }
  let bookings: BookingRequest[] = [];
  try {
    const res = await fetch(
      `${BASE_URL}/booking/my-list-trainee?page=1&limit=5&sortBy=asc&filter.status=pending`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${license}`,
        },
      },
    );
    const data = await res.json();
    if (!res.ok) {
      toast.error(getErrorMessage(data));
      bookings = defaultBookings;
    } else {
      bookings = data.data || [];
    }
  } catch {
    bookings = defaultBookings;
  }
  return (
    <div className="space-y-6">
      <AccessDashboardItemTrainee />

      <TableBookingTrainee bookings={bookings} license={license} />
    </div>
  );
}

export default DashboardTraineePage;
