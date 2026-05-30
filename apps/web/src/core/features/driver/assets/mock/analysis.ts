export const defaultAnalysisData = {
  requests: {
    total: 0,
    pending: 0,
    rejected: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
  },
  appointments: {
    total: 0,
    scheduled: 0,
    completed: 0,
    cancelled: 0,
    averageScore: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
  },
  conversion: {
    rate: 0,
    totalRequests: 0,
    totalAppointments: 0,
  },
};

export const monthlyData = [
  { name: "فروردین", amount: 4000 },
  { name: "اردیبهشت", amount: 3000 },
  { name: "خرداد", amount: 5000 },
  { name: "تیر", amount: 4500 },
  { name: "مرداد", amount: 6000 },
  { name: "شهریور", amount: 5500 },
  { name: "مهر", amount: 7000 },
  { name: "آبان", amount: 6500 },
  { name: "آذر", amount: 8000 },
  { name: "دی", amount: 7500 },
  { name: "بهمن", amount: 9000 },
  { name: "اسفند", amount: 8500 },
];

export const weeklyData = [
  { name: "شنبه", count: 120 },
  { name: "یکشنبه", count: 90 },
  { name: "دوشنبه", count: 150 },
  { name: "سه‌شنبه", count: 180 },
  { name: "چهارشنبه", count: 160 },
  { name: "پنجشنبه", count: 200 },
  { name: "جمعه", count: 250 },
];
