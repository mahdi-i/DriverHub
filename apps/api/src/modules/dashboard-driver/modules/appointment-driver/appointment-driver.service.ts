import { Injectable } from '@nestjs/common';
import { CreateAppointmentDriverDto } from './dto/create-appointment-driver.dto';
import { UpdateAppointmentDriverDto } from './dto/update-appointment-driver.dto';

@Injectable()
export class AppointmentDriverService {
  create(createAppointmentDriverDto: CreateAppointmentDriverDto) {
    return 'This action adds a new appointmentDriver';
  }

  findAll(userId: string) {
    return `This action returns all appointmentDriver`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointmentDriver`;
  }

  update(id: number, updateAppointmentDriverDto: UpdateAppointmentDriverDto) {
    return `This action updates a #${id} appointmentDriver`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointmentDriver`;
  }
}
