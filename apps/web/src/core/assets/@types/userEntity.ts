import { Roles } from "@driverhub/shared-types";

export interface UserEntity {
  id: string;
  phone: string;
  isActive: boolean;
  role: Roles;
  createdAt: string;
  updatedAt: string;
}
