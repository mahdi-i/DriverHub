import { TraineeProfileCompleteGuard } from '@core/dashboard-trainee/guard/trainee-profile-complete.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppointmentRequestsService } from './appointment-requests.service';
import { CreateAppointmentRequestDto } from './dto/create-appointment_request.dto';
import { UpdateAppointmentRequestDto } from './dto/update-appointment_request.dto';

@Controller('appointment-requests')
@UseGuards(TraineeProfileCompleteGuard)
export class AppointmentRequestsController {
  constructor(
    private readonly appointmentRequestsService: AppointmentRequestsService,
  ) {}

  @Post()
  create(@Body() createAppointmentRequestDto: CreateAppointmentRequestDto) {
    return this.appointmentRequestsService.create(createAppointmentRequestDto);
  }

  @Get()
  findAll() {
    return this.appointmentRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentRequestDto: UpdateAppointmentRequestDto,
  ) {
    return this.appointmentRequestsService.update(
      +id,
      updateAppointmentRequestDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentRequestsService.remove(+id);
  }
}
