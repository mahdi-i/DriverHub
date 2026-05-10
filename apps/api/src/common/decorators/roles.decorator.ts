import { SetMetadata } from '@nestjs/common';
import { Roles } from '@driverhub/shared-types';

export const RolesDecorator = (...roles: Roles[]) =>
  SetMetadata(process.env.ROLES_KEY, roles);
