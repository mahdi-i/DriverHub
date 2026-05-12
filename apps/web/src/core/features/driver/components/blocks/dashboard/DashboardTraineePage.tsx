import TabelBookingDashboard from "../../ui/bookings/TabelBookingDashboard";
import AccessDashboardItemTrainee from "../../ui/dashboard/AccessDashboardItemTrainee";

function DashboardTraineePage() {
  return (
    <div className="space-y-6">
      <AccessDashboardItemTrainee />

      <TabelBookingDashboard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      </div>
    </div>
  );
}

export default DashboardTraineePage;
