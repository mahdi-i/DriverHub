import { ProfileDriverTs } from "@/core/features/driver/assets/types/profileDriverTs";
import { ProfileTraineeTs } from "@/core/features/trainee/assets/types/profileTrineeTs";
import { AppointmentStatus } from "@driverhub/shared-types";

export interface BookingRequest {
  id: string;
  driver: ProfileDriverTs;
  student: ProfileTraineeTs;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
  startTime?: string;
  endTime?: string;
}
