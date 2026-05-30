import { UserEntity } from "@/core/assets/@types/userEntity";
import { GenderEnum } from "@driverhub/shared-types";

export interface ProfileTraineeTs {
  fullName: string;
  nationalCode: string;
  age: number;
  gender: GenderEnum;
  hasGlasses: boolean;
  medicalConditions: string;
  address: string;
  city?: string;
  postalCode: string;
  isProfileComplete: boolean;
  user: UserEntity;
}
