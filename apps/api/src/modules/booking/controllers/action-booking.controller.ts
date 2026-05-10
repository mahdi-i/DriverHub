import { ProfileCompleteGuard } from '@core/dashboard-driver/guards/profile-complete.guard';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { RolesDecorator } from '@shared/decorators/roles.decorator';
import { UserInfo } from '@shared/decorators/user.decorator';
import { Roles } from '@shared/enums/role.enum';
import { ActionBookingService } from '../services/action-booking.service';

@Controller('action-booking')
export class ActionBookingController {
  constructor(private readonly actionBookingService: ActionBookingService) {}

  @Post(':id/cancel')
  cancel(@Param('id') id: string, @UserInfo('id') userId: string) {
    return this.actionBookingService.cancel(id, userId);
  }

  @Post(':id/confirm')
  @RolesDecorator(Roles.TEACHER)
  @UseGuards(ProfileCompleteGuard)
  confirm(
    @Param('id') id: string,
    @UserInfo('id') driverId: string,
    @Body() body: { note?: string },
  ) {
    return this.actionBookingService.confirm(id, driverId, body.note);
  }

  @Post(':id/reject')
  @RolesDecorator(Roles.TEACHER)
  @UseGuards(ProfileCompleteGuard)
  reject(
    @Param('id') id: string,
    @UserInfo('id') driverId: string,
    @Body() body: { reason: string },
  ) {
    return this.actionBookingService.reject(id, driverId, body.reason);
  }

  @Post(':id/complete')
  @RolesDecorator(Roles.TEACHER)
  @UseGuards(ProfileCompleteGuard)
  complete(
    @Param('id') id: string,
    @UserInfo('id') driverId: string,
    @Body() body: { score?: number },
  ) {
    return this.actionBookingService.complete(id, driverId, body.score);
  }
}
