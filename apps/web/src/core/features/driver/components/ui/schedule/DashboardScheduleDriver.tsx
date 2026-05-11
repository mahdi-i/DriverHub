import HeadScheduleDriver from "./HeadScheduleDriver";
import TabelScheduleDriver from "./TabelScheduleDriver";

function DashboardScheduleDriver() {
  return (
    <div className="space-y-3.5">
      <HeadScheduleDriver />

      <TabelScheduleDriver />
    </div>
  );
}

export default DashboardScheduleDriver;
