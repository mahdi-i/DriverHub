import { ProfileCompleteGuard } from '@core/dashboard-driver/guards/profile-complete.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PaginationOptions } from '@shared/decorators/pagination-option.decorator';
import { RolesDecorator } from '@shared/decorators/roles.decorator';
import { UserInfo } from '@shared/decorators/user.decorator';
import { Roles } from '@shared/enums/role.enum';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { AppointmentService } from '../services/appointment.service';

@Controller('appointment')
@RolesDecorator(Roles.TEACHER)
@UseGuards(ProfileCompleteGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post(':id/complete')
  completedAppointment(
    @Param('id') id: string,
    @UserInfo('id') userid: string,
  ) {
    return this.appointmentService.completedAppointment(id, userid);
  }
  @Post(':id/camcelled')
  camcelledAppointment(
    @Param('id') id: string,
    @UserInfo('id') userid: string,
  ) {
    return this.appointmentService.camcelledAppointment(id, userid);
  }

  @Get()
  @PaginationOptions({
    sortOptions: [{ example: 'startTime:DESC' }],
    filterOptions: [
      { field: 'status', example: 'SCHEDULED' },
      { field: 'student.fullName', example: 'علی' },
    ],
  })
  findAll(@Paginate() query: PaginateQuery, @UserInfo('id') driverId: string) {
    return this.appointmentService.findAllByDriver(query, driverId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @UserInfo('id') driverId: string) {
    return this.appointmentService.findOne(id, driverId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @UserInfo('id') driverId: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, driverId, updateAppointmentDto);
  }
}
