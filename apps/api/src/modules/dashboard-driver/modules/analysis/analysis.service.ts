import { Booking } from '@core/booking/entities/booking.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentStatus } from '@shared/enums/appointment-status.enum';
import { Repository } from 'typeorm';
import {
  AppointmentAnalysis,
  ConversionAnalysis,
  DriverAnalysisResponseDto,
  RequestAnalysis,
} from './dto/create-analysis.dto';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
  ) {}

  async getAnalysis(driverId: string): Promise<DriverAnalysisResponseDto> {
    const bookings = await this.bookingRepo.find({
      where: { driver: { id: driverId } },
    });

    return {
      requests: this.calculateRequestAnalysis(bookings),
      appointments: this.calculateAppointmentAnalysis(bookings),
      conversion: this.calculateConversion(bookings),
    };
  }

  private calculateRequestAnalysis(bookings: Booking[]): RequestAnalysis {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const pending = bookings.filter(
      (b) => b.status === AppointmentStatus.PENDING,
    );
    const rejected = bookings.filter(
      (b) => b.status === AppointmentStatus.REJECTED,
    );

    return {
      total: bookings.length,
      pending: pending.length,
      rejected: rejected.length,
      today: bookings.filter((b) => new Date(b.startTime) >= startOfDay).length,
      thisWeek: bookings.filter((b) => new Date(b.startTime) >= startOfWeek)
        .length,
      thisMonth: bookings.filter((b) => new Date(b.startTime) >= startOfMonth)
        .length,
    };
  }

  private calculateAppointmentAnalysis(
    bookings: Booking[],
  ): AppointmentAnalysis {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const confirmed = bookings.filter(
      (b) => b.status === AppointmentStatus.CONFIRMED,
    );
    const completed = bookings.filter(
      (b) => b.status === AppointmentStatus.COMPLETED,
    );
    const cancelled = bookings.filter(
      (b) => b.status === AppointmentStatus.CANCELLED,
    );

    const completedWithScore = completed.filter(
      (b) => b.score !== undefined && b.score > 0,
    );
    const averageScore =
      completedWithScore.length > 0
        ? completedWithScore.reduce((sum, b) => sum + (b.score ?? 0), 0) /
          completedWithScore.length
        : 0;

    return {
      total: confirmed.length + completed.length + cancelled.length,
      scheduled: confirmed.length,
      completed: completed.length,
      cancelled: cancelled.length,
      averageScore: Math.round(averageScore * 10) / 10,
      today: completed.filter((b) => new Date(b.startTime) >= startOfDay)
        .length,
      thisWeek: completed.filter((b) => new Date(b.startTime) >= startOfWeek)
        .length,
      thisMonth: completed.filter((b) => new Date(b.startTime) >= startOfMonth)
        .length,
    };
  }

  private calculateConversion(bookings: Booking[]): ConversionAnalysis {
    const totalRequests = bookings.length;
    const totalAppointments = bookings.filter(
      (b) =>
        b.status === AppointmentStatus.CONFIRMED ||
        b.status === AppointmentStatus.COMPLETED,
    ).length;

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
