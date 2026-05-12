import { useEffect, useRef, useState } from "react";

export function useTimer(initialSeconds: number, onComplete?: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, onComplete]);

  const resetTimer = () => setTimeLeft(initialSeconds);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return {
    timeLeft,
    resetTimer,
    formattedTime: formatTime(timeLeft),
    resindCode: timeLeft === 0,
  };
}
