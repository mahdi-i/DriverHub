import { ProfileCompleteGuard } from '@core/dashboard-driver/guards/profile-complete.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';

@Controller('driver')
@UseGuards(ProfileCompleteGuard)
export class DriverController {
  constructor(private readonly driverService: DriverService) {}
}
