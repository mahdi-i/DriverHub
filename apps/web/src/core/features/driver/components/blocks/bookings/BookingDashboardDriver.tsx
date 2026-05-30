import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_SORT,
} from "@/core/assets/@types/defaultParamsTs";
import { SortEnumBy } from "@/core/assets/@types/enum/sortBy";
import { BookingRequest } from "@/core/features/booking/assets/types/bookingTs";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { getAccessTokenSSR } from "@/core/lib/coockie/getAccess";
import { AppointmentStatus, GenderEnum } from "@driverhub/shared-types";
import { toast } from "sonner";
import HeadBookingDashboard from "../../../../../components/custom/ui/booking/HeadBookingDashboard";
import TabelBookingDashboard from "../../ui/bookings/TabelBookingDashboard";
const defaultBookings: BookingRequest[] = [];

async function BookingDashboardDriver({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    "filter.status"?: AppointmentStatus;
    "filter.student.gender"?: GenderEnum;
    sortBy?: SortEnumBy;
  }>;
}) {
  let bookings: BookingRequest[] = defaultBookings;
  const license = await getAccessTokenSSR();
  try {
    const Params = await searchParams;
    const page = Params.page || DEFAULT_PAGE;
    const limit = Params.limit || DEFAULT_LIMIT;
    const sortBy = Params.sortBy || DEFAULT_SORT;
    const status = Params["filter.status"];
    const gender = Params["filter.student.gender"];

    const query = new URLSearchParams();
    query.set("page", page);
    query.set("limit", limit);
    if (sortBy) query.set("sortBy", `${sortBy}`);
    if (gender) query.set("filter.student.gender", `${gender}`);
    if (status) query.set("filter.status", `${status}`);

    const queryString = query.toString();

    const res = await fetch(
      `${BASE_URL}/booking/incoming-requests?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${license}`,
        },
        next: { tags: [`booking-driver`] },
      },
    );

    if (!res.ok) {
      let errorMessage = "خطا در دریافت درخواست‌ها";
      try {
        const errorData = await res.json();
        errorMessage = errorData.errors || errorData.message || errorMessage;
      } catch {
        errorMessage = `خطای سرور (${res.status})`;
      }

      toast.error(errorMessage);

      bookings = defaultBookings;
    } else {
      const result = await res.json();
      bookings = result.data || [];
    }
  } catch (err) {
    console.log(
      err instanceof Error
        ? err.message
        : "خطای نامشخص در بارگذاری لیست نوبت‌ها",
    );
    bookings = defaultBookings;
  }

  return (
    <div>
      <HeadBookingDashboard />
      <TabelBookingDashboard bookings={bookings} license={license} />
    </div>
  );
}

export default BookingDashboardDriver;
