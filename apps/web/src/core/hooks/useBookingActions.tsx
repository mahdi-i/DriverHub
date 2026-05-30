import { useCallback, useState } from "react";
import { BASE_URL } from "../lib/basic-link/BackendBasicLink";
import { revalidateBookingChache } from "../lib/revalidate/Revalidate";

export function useBookingActions(bookingId: string, license: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeAction = useCallback(
    async (action: "confirm" | "reject" | "complete" | "cancel") => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${BASE_URL}/action-booking/${bookingId}/${action}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${license}`,
            },
          },
        );

        const data = await res.json();

        if (!res.ok) {
          const error = data.errors || `خطا در عملیات ${action}`;
          setError(error);
          throw new Error(error);
        }
        await revalidateBookingChache(bookingId);
        return data;
      } catch (err) {
        if (!error) {
          setError(err instanceof Error ? err.message : "خطای نامشخص در شبکه");
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [bookingId, license, error],
  );

  return { executeAction, isLoading, error };
}
