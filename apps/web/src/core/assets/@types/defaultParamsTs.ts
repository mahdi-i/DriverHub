import { AppointmentStatus, GenderEnum } from "@driverhub/shared-types";
import { SortEnumBy } from "./enum/sortBy";

export const DEFAULT_PAGE = "1";
export const DEFAULT_LIMIT = "10";
export const DEFAULT_STATUS = AppointmentStatus.PENDING;
export const DEFAULT_GENDER = GenderEnum.MALE;
export const DEFAULT_SORT = SortEnumBy.ASC;
