"use client";

// فقط یه تابع ساده برای نمایش تاریخ فارسی
export function formatDate(date: Date | string | number) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "تاریخ نامعتبر";

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

// تاریخ با ساعت
export function formatDateTime(date: Date | string | number) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "تاریخ نامعتبر";

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
