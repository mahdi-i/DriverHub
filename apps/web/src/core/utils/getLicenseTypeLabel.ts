import { LicenseTypeEnum } from "@driverhub/shared-types";

export function getLicenseTypeLabel(type: LicenseTypeEnum): string {
  switch (type) {
    case LicenseTypeEnum.CAR:
      return "سواری";
    case LicenseTypeEnum.MOTORCYCLE:
      return "موتورسیکلت";
    case LicenseTypeEnum.BASE1:
      return "سنگین";
    case LicenseTypeEnum.BASE2:
      return "نیمه سنگین";
    case LicenseTypeEnum.BASE3:
      return "سبک";
    default:
      return "نامشخص";
  }
}
