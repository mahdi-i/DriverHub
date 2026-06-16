import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_SORT,
} from "@/core/assets/@types/defaultParamsTs";
import { SortEnumBy } from "@/core/assets/@types/enum/sortBy";
import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";

import BodyBookingResult from "@/core/features/booking/components/ui/filter/booking/body/BodyBookingResult";
import HeadFilterBooking from "@/core/features/booking/components/ui/filter/HeadFilterBooking";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { getAccessTokenSSR } from "@/core/lib/coockie/getAccess";
import { getErrorMessage } from "@/core/utils/getErrorMessage";
import {
  DaysOfWeek,
  GenderEnum,
  LicenseTypeEnum,
} from "@driverhub/shared-types";
import { toast } from "sonner";
import { DriversBookingsTs } from "../../../assets/types/driversBookingsTs";
const defaultBookings: DriversBookingsTs[] = [];

async function BookingFilterComponnets({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    "filter.licenseType"?: LicenseTypeEnum;
    "filter.gender"?: GenderEnum;
    "filter.experienceYears"?: string;
    "filter.age[$gte]"?: string;
    "filter.age[$lte]"?: string;
    "filter.startTime"?: string;
    "filter.endTime"?: string;
    "filter.dayOfWeek"?: DaysOfWeek;
    sortBy?: SortEnumBy;
  }>;
}) {
  let bookings: DriversBookingsTs[] = defaultBookings;
  const license = await getAccessTokenSSR();
  try {
    const Params = await searchParams;
    const page = Params.page || DEFAULT_PAGE;
    const limit = Params.limit || DEFAULT_LIMIT;
    const sortBy = Params.sortBy || DEFAULT_SORT;
    const gender = Params["filter.gender"];
    const licenseType = Params["filter.licenseType"];
    const experienceYears = Params["filter.experienceYears"];
    const ageGte = Params["filter.age[$gte]"];
    const ageLte = Params["filter.age[$lte]"];
    const hasGlasses = Params["filter.hasGlasses"];
    const dayOfWeek = Params["filter.dayOfWeek"];

    const query = new URLSearchParams();
    query.set("page", page);
    query.set("limit", limit);
    if (sortBy) query.set("sortBy", `${sortBy}`);
    if (gender) query.set("filter.gender", `${gender}`);
    if (licenseType) query.set("filter.licenseType", licenseType);
    if (gender) query.set("filter.gender", gender);
    if (experienceYears) query.set("filter.experienceYears", experienceYears);
    if (ageGte) query.set("filter.age[$gte]", ageGte);
    if (ageLte) query.set("filter.age[$lte]", ageLte);
    if (hasGlasses) query.set("filter.hasGlasses", hasGlasses);
    if (dayOfWeek) query.set("filter.dayOfWeek", dayOfWeek);

    const queryString = query.toString();

    const res = await fetch(
      `${BASE_URL}/booking/filter-booking?${queryString}`,
      {
        method: "GET",
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
      const sortData = data.data || [];
      bookings = sortData.map((item) => item.driver);
    }
  } catch {
    bookings = defaultBookings;
  }
  console.log(bookings, "wdiosduhni");
  return (
    <SectionLayout>
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        <HeadFilterBooking />

        <BodyBookingResult bookings={bookings} />
      </div>
    </SectionLayout>
  );
}

export default BookingFilterComponnets;
