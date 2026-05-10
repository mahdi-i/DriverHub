import { PartialType } from '@nestjs/mapped-types';

import { CreateDashboardAdminDto } from './create-dashboard-admin.dto';

export class UpdateDashboardAdminDto extends PartialType(
  CreateDashboardAdminDto,
) {}
