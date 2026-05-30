import { GenderEnum, LicenseTypeEnum } from "@driverhub/shared-types";

export interface DriverProfile {
  id: string | number;
  name: string;
  city: string;
  province: string;
  licenseType: LicenseTypeEnum;
  gender: GenderEnum;
  image: string;
  hasBadge?: boolean;
  rating?: number;
}
