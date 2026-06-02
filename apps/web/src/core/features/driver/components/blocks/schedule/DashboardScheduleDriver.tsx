import { getAccessTokenSSR } from "@/core/lib/coockie/getAccess";
import TabelScheduleDriver from "../../ui/schedule/TabelScheduleDriver";
import { redirect } from "next/navigation";

async function DashboardScheduleDriver() {
  const license = await getAccessTokenSSR();
  if (!license) {
    redirect("/");
  }
  return (
    <div className="space-y-3.5">
      <TabelScheduleDriver license={license} />
    </div>
  );
}

export default DashboardScheduleDriver;
