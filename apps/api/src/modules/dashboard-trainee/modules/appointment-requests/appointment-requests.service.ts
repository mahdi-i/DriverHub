import { Injectable } from '@nestjs/common';
import { CreateAppointmentRequestDto } from './dto/create-appointment_request.dto';
import { UpdateAppointmentRequestDto } from './dto/update-appointment_request.dto';

@Injectable()
export class AppointmentRequestsService {
  create(createAppointmentRequestDto: CreateAppointmentRequestDto) {
    return 'This action adds a new appointmentRequest';
  }

  findAll() {
    return `This action returns all appointmentRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointmentRequest`;
  }

  update(id: number, updateAppointmentRequestDto: UpdateAppointmentRequestDto) {
    return `This action updates a #${id} appointmentRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointmentRequest`;
  }
}
