export class DriverAnalysisResponseDto {
  requests: RequestAnalysis;
  appointments: AppointmentAnalysis;
  conversion: ConversionAnalysis;
}

export class RequestAnalysis {
  total: number;
  pending: number;
  rejected: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

export class AppointmentAnalysis {
  total: number;
  scheduled: number;
  completed: number;
  cancelled: number;
  averageScore: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

export class ConversionAnalysis {
  rate: number;
  totalRequests: number;
  totalAppointments: number;
}
