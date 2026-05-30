import EditeModalDayOfWeek from "./modal/EditeModalDayOfWeek";
import SetScheduleModal from "./modal/SetScheduleModal";
import TrashModalDayOfWeek from "./modal/TrashModalDayOfWeek";

export default function ScheduleRowActions({
  day,
  schedule,
  license,
  selectId,
  isSet,
}) {
  console.log(selectId, "selectId selectId xxxxxx");
  return (
    <>
      {!isSet && (
        <SetScheduleModal
          day={day}
          schedule={schedule}
          license={license}
          selectId={selectId}
        />
      )}
      <EditeModalDayOfWeek
        day={day}
        schedule={schedule}
        license={license}
        selectId={selectId}
      />

      <TrashModalDayOfWeek day={day} license={license} selectId={selectId} />
    </>
  );
}
