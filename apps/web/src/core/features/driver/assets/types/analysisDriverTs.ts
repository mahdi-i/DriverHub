export interface AnalysisData {
  requests: {
    total: number;
    pending: number;
    rejected: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  appointments: {
    total: number;
    scheduled: number;
    completed: number;
    cancelled: number;
    averageScore: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  conversion: {
    rate: number;
    totalRequests: number;
    totalAppointments: number;
  };
}
