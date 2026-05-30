import { UserEntity } from "@/core/assets/@types/userEntity";
import { GenderEnum, LicenseTypeEnum } from "@driverhub/shared-types";

export interface ProfileDriverTs {
  id: string;
  fullName: string;
  nationalCode?: string;
  age?: number;
  gender: GenderEnum;
  city?: string | null;
  address?: string;
  experienceYears: number;
  licenseType: LicenseTypeEnum;
  licenseNumber: string;
  carModel: string;
  carColor: string;
  bankAccountNumber: string;
  certificateUrl: string;
  hasGlasses?: boolean;
  medicalConditions?: string;
  isProfileComplete: boolean;
  user: UserEntity;
  createdAt: string;
  updatedAt: string;
}
export interface DriverEditInfo {
  id: string;
  carModel: string;
  carColor: string;
  experienceYears: number;
  fullName: string;
  gender: GenderEnum;
  age: number;
  hasGlasses: boolean;
  medicalConditions: string;
  address: string;
}
