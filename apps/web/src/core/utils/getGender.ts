import { GenderEnum } from "@driverhub/shared-types";

export function getGender(type: GenderEnum): string {
  switch (type) {
    case GenderEnum.FEMALE:
      return "زن";
    case GenderEnum.MALE:
      return "مرد";

    default:
      return "نامشخص";
  }
}
