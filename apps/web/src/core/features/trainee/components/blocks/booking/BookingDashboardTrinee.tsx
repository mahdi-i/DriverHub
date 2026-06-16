import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_SORT,
} from "@/core/assets/@types/defaultParamsTs";
import { SortEnumBy } from "@/core/assets/@types/enum/sortBy";
import { BookingRequest } from "@/core/features/booking/assets/types/bookingTs";
import BookingTableSkeleton from "@/core/features/booking/components/ui/skeleton/BookingTableSkeleton";
import HeadBookingDashboardSkeleton from "@/core/features/booking/components/ui/skeleton/HeadBookingDashboardSkeleton";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { getAccessTokenSSR } from "@/core/lib/coockie/getAccess";
import { getErrorMessage } from "@/core/utils/getErrorMessage";
import { AppointmentStatus, GenderEnum } from "@driverhub/shared-types";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";
import HeadBookingDashboard from "../../../../../components/custom/ui/booking/HeadBookingDashboard";
import TabelBookingDashboardTrinee from "../../ui/bookings/TabelBookingDashboardTrinee";
const defaultBookings: BookingRequest[] = [];

async function BookingDashboardTrinee({
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
  if (!license) {
    redirect("/");
  }
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
      `${BASE_URL}/booking/my-list-trainee?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${license}`,
        },
        next: { tags: [`booking-trinee`] },
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
    <div>
      <Suspense fallback={<HeadBookingDashboardSkeleton />}>
        <HeadBookingDashboard />
      </Suspense>
      <Suspense fallback={<BookingTableSkeleton />}>
        <TabelBookingDashboardTrinee bookings={bookings} license={license} />
      </Suspense>
    </div>
  );
}

export default BookingDashboardTrinee;
