import { Roles } from '@driverhub/shared-types';

export type JwtPayload = {
  sub: string;
  role: Roles;
  permissions?: string[];
};
