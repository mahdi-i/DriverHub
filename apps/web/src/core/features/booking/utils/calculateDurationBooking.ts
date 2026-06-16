export function calculateDurationBooking(start: string, end: string): string {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const durationMinutes =
    endHour * 60 + endMinute - (startHour * 60 + startMinute);
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) return `${minutes} دقیقه`;
  if (minutes === 0) return `${hours} ساعت`;
  return `${hours} ساعت و ${minutes} دقیقه`;
}
