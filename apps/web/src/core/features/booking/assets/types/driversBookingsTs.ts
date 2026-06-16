import { GenderEnum, LicenseTypeEnum } from "@driverhub/shared-types";

export interface DriversBookingsTs {
  id: string;
  name: string;
  licenseType: LicenseTypeEnum;
  experience: number;
  carColor: string;
  carModel: string;
  totalBooking: number;
  age: number;
  gender: GenderEnum;
  city: string;
  isComplete: true;
  hasGlasses: true;
  medicalConditions: string;
}
