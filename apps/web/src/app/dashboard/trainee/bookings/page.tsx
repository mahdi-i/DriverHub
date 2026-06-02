import { SortEnumBy } from "@/core/assets/@types/enum/sortBy";
import BookingDashboardTrinee from "@/core/features/trainee/components/blocks/booking/BookingDashboardTrinee";
import { AppointmentStatus, GenderEnum } from "@driverhub/shared-types";

function page({
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
  return <BookingDashboardTrinee searchParams={searchParams} />;
}

export default page;
