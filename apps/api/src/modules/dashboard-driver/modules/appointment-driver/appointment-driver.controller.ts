import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesDecorator } from '@shared/decorators/roles.decorator';
import { Roles } from '@shared/enums/role.enum';
import { AppointmentDriverService } from './appointment-driver.service';
import { CreateAppointmentDriverDto } from './dto/create-appointment-driver.dto';
import { UpdateAppointmentDriverDto } from './dto/update-appointment-driver.dto';
import { UserInfo } from '@shared/decorators/user.decorator';

@Controller('appointment-driver')
@RolesDecorator(Roles.TEACHER)
export class AppointmentDriverController {
  constructor(
    private readonly appointmentDriverService: AppointmentDriverService,
  ) {}

  @Post()
  create(@Body() createAppointmentDriverDto: CreateAppointmentDriverDto) {
    return this.appointmentDriverService.create(createAppointmentDriverDto);
  }

  @Get('my-trainee')
  findAll(@UserInfo('id') userId: string) {
    return this.appointmentDriverService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentDriverService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDriverDto: UpdateAppointmentDriverDto,
  ) {
    return this.appointmentDriverService.update(
      +id,
      updateAppointmentDriverDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentDriverService.remove(+id);
  }
}
