import { AppointmentStatus } from "@driverhub/shared-types";

export function getStatusBadgeVariant(status: AppointmentStatus) {
  switch (status) {
    case AppointmentStatus.PENDING:
      return "secondary";
    case AppointmentStatus.CONFIRMED:
      return "default";
    case AppointmentStatus.COMPLETED:
      return "success";
    case AppointmentStatus.REJECTED:
      return "destructive";
    case AppointmentStatus.CANCELLED:
      return "outline";
    default:
      return "secondary";
  }
}
