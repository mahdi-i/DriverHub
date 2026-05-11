import EditeModalDayOfWeek from "./modal/EditeModalDayOfWeek";
import TrashModalDayOfWeek from "./modal/TrashModalDayOfWeek";

export default function ScheduleRowActions({ day, schedule }) {
  return (
    <>
      <EditeModalDayOfWeek day={day} schedule={schedule} />

      <TrashModalDayOfWeek day={day} />
    </>
  );
}
