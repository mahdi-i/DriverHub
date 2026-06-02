"use server";
import { revalidateTag } from "next/cache";

export async function revalidateChache(driverId: string) {
  revalidateTag(`schedule-driver-${driverId}`, "max");
}
export async function revalidateBookingChache(driverId: string) {
  revalidateTag(`booking-driver-${driverId}`, "max");
}
