import { AppointmentRequest } from '@core/dashboard-trainee/modules/appointment-requests/entities/appointment-request.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentStatus } from '@shared/enums/appointment-status.enum';
import { RequestStatus } from '@shared/enums/request-status.enum';
import { Repository } from 'typeorm';
import { Appointment } from '../appointment/entities/appointment.entity';
import {
  AppointmentAnalysis,
  ConversionAnalysis,
  DriverAnalysisResponseDto,
  RequestAnalysis,
} from './dto/create-analysis.dto';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(AppointmentRequest)
    private requestRepo: Repository<AppointmentRequest>,
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
  ) {}
  async getAnalysis(driverId: string): Promise<DriverAnalysisResponseDto> {
    const [requests, appointments] = await Promise.all([
      this.requestRepo.find({ where: { driver: { id: driverId } } }),
      this.appointmentRepo.find({ where: { driver: { id: driverId } } }),
    ]);

    return {
      requests: this.calculateRequestAnalysis(requests),
      appointments: this.calculateAppointmentAnalysis(appointments),
      conversion: this.calculateConversion(requests, appointments),
    };
  }
  private calculateRequestAnalysis(
    requests: AppointmentRequest[],
  ): RequestAnalysis {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const pending = requests.filter((r) => r.status === RequestStatus.PENDING);

    const rejected = requests.filter(
      (r) => r.status === RequestStatus.REJECTED,
    );

    return {
      total: requests.length,
      pending: pending.length,

      rejected: rejected.length,
      today: requests.filter((r) => new Date(r.requestedDate) >= startOfDay)
        .length,
      thisWeek: requests.filter((r) => new Date(r.requestedDate) >= startOfWeek)
        .length,
      thisMonth: requests.filter(
        (r) => new Date(r.requestedDate) >= startOfMonth,
      ).length,
    };
  }

  private calculateAppointmentAnalysis(
    appointments: Appointment[],
  ): AppointmentAnalysis {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const scheduled = appointments.filter(
      (a) => a.status === AppointmentStatus.SCHEDULED,
    );
    const completed = appointments.filter(
      (a) => a.status === AppointmentStatus.COMPLETED,
    );
    const cancelled = appointments.filter(
      (a) => a.status === AppointmentStatus.CANCELLED,
    );

    const completedWithScore = completed.filter((a) => a.score > 0);
    const averageScore =
      completedWithScore.length > 0
        ? completedWithScore.reduce((sum, a) => sum + a.score, 0) /
          completedWithScore.length
        : 0;

    return {
      total: appointments.length,
      scheduled: scheduled.length,
      completed: completed.length,
      cancelled: cancelled.length,
      averageScore: Math.round(averageScore * 10) / 10,
      today: appointments.filter((a) => new Date(a.startTime) >= startOfDay)
        .length,
      thisWeek: appointments.filter((a) => new Date(a.startTime) >= startOfWeek)
        .length,
      thisMonth: appointments.filter(
        (a) => new Date(a.startTime) >= startOfMonth,
      ).length,
    };
  }

  private calculateConversion(
    requests: AppointmentRequest[],
    appointments: Appointment[],
  ): ConversionAnalysis {
    const totalRequests = requests.length;
    const totalAppointments = appointments.length;
    const rate =
      totalRequests > 0
        ? Math.round((totalAppointments / totalRequests) * 100)
        : 0;

    return {
      rate,
      totalRequests,
      totalAppointments,
    };
  }
}
