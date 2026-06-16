import { TimeSlot } from "../assets/types/timeSlot";

export function calculateTotalFreeHours(slots: TimeSlot[]): string {
  const totalMinutes = slots
    .filter((slot) => slot.status === "FREE")
    .reduce((total, slot) => {
      const [startHour, startMinute] = slot.start.split(":").map(Number);
      const [endHour, endMinute] = slot.end.split(":").map(Number);
      return (
        total + (endHour * 60 + endMinute - (startHour * 60 + startMinute))
      );
    }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} دقیقه`;
  if (minutes === 0) return `${hours} ساعت`;
  return `${hours} ساعت و ${minutes} دقیقه`;
}
