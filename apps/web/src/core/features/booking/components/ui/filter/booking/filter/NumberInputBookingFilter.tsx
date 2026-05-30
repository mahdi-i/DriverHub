import NumberInput from "@/core/components/custom/ui/number-input/NumberInput";
import { useState } from "react";
import CalendarBooking from "../../calendar/CalendarBooking";
function NumberInputBookingFilter() {
  const [statrValueCalendar, setStartValueCalendar] = useState<Date | null>(
    null,
  );
  const [endValueCalendar, setEndValueCalendar] = useState<Date | null>(null);
  const [ageRange, setAgeRange] = useState({ start: "", end: "" });
  const [experienceRange, setExperienceRange] = useState({
    start: "",
    end: "",
  });
  const handleAgeChange = (start: string, end: string) => {
    setAgeRange({ start, end });
    console.log("سن:", start, "تا", end);
  };

  const handleExperienceChange = (start: string, end: string) => {
    setExperienceRange({ start, end });
    console.log("سابقه:", start, "تا", end);
  };
  return (
    <>
      <div className="space-y-4">
        <NumberInput
          label="محدوده سنی"
          placeholderStart="حداقل"
          placeholderEnd="حداکثر"
          onChange={handleAgeChange}
        />

        <NumberInput
          label="سابقه کار (سال)"
          placeholderStart="حداقل"
          placeholderEnd="حداکثر"
          onChange={handleExperienceChange}
        />
      </div>

      <div className="h-px w-full bg-border" />

      <div className="space-y-4">
        <CalendarBooking
          setValueCalendar={setStartValueCalendar}
          valueCalendar={statrValueCalendar}
          label={"محدوده شروع"}
        />
        <CalendarBooking
          setValueCalendar={setEndValueCalendar}
          valueCalendar={endValueCalendar}
          label={"محدوده پایان"}
        />
      </div>
    </>
  );
}

export default NumberInputBookingFilter;
