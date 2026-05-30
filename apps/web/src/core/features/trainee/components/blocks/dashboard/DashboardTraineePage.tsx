import { BookingRequest } from "@/core/features/booking/assets/types/bookingTs";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { getAccessTokenSSR } from "@/core/lib/coockie/getAccess";
import { toast } from "sonner";
import TableBookingTrainee from "../../ui/bookings/TabelBookingDashboardTrinee";
import AccessDashboardItemTrainee from "../../ui/dashboard/AccessDashboardItemTrainee";
const defaultBookings: BookingRequest[] = [];

async function DashboardTraineePage() {
  const license = await getAccessTokenSSR();
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
      let errorMessage = "خطا در دریافت درخواست‌ها";
      try {
        errorMessage = data.errors || data.message || errorMessage;
      } catch {
        errorMessage = `خطای سرور (${res.status})`;
      }

      toast.error(errorMessage);
      bookings = defaultBookings;
    } else {
      const result = await res.json();
      bookings = result.data || [];
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
