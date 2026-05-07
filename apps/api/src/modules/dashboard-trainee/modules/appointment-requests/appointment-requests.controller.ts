import { TraineeProfileCompleteGuard } from '@core/dashboard-trainee/guard/trainee-profile-complete.guard';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PaginationOptions } from '@shared/decorators/pagination-option.decorator';
import { UserInfo } from '@shared/decorators/user.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AppointmentRequestsService } from './appointment-requests.service';

@Controller('appointment-requests')
@UseGuards(TraineeProfileCompleteGuard)
export class AppointmentRequestsController {
  constructor(
    private readonly appointmentRequestsService: AppointmentRequestsService,
  ) {}

  @Post(':id/camcelled')
  camcelledAppointment(
    @Param('id') id: string,
    @UserInfo('id') userid: string,
  ) {
    return this.appointmentRequestsService.camcelledAppointment(id, userid);
  }

  @Get('all-my-appointment')
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:DESC' }],
    filterOptions: [
      { field: 'filter.status', example: 'PENDING' },
      { field: 'filter.student.gender', example: 'MALE' },
    ],
  })
  findAll(@Paginate() query: PaginateQuery, @UserInfo('id') userId: string) {
    return this.appointmentRequestsService.findAll(query, userId);
  }
}
