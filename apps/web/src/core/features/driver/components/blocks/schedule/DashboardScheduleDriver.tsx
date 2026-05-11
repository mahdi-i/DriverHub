import HeadScheduleDriver from "../../ui/schedule/HeadScheduleDriver";
import TabelScheduleDriver from "../../ui/schedule/TabelScheduleDriver";

function DashboardScheduleDriver() {
  return (
    <div className="space-y-3.5">
      <HeadScheduleDriver />

      <TabelScheduleDriver />
    </div>
  );
}

export default DashboardScheduleDriver;
