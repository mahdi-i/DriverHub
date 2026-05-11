import { AppointmentStatus } from "@driverhub/shared-types";

export function getStatusLabel(status: AppointmentStatus): string {
  switch (status) {
    case AppointmentStatus.PENDING:
      return "در انتظار";
    case AppointmentStatus.CONFIRMED:
      return "تایید";
    case AppointmentStatus.COMPLETED:
      return "تأیید شده";
    case AppointmentStatus.REJECTED:
      return "رد شده";
    case AppointmentStatus.CANCELLED:
      return "لغو شده";
    default:
      return "نامشخص";
  }
}
