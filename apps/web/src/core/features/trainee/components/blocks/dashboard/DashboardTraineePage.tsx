import TableBookingTrainee from "../../ui/bookings/TabelBookingDashboardTrinee";
import AccessDashboardItemTrainee from "../../ui/dashboard/AccessDashboardItemTrainee";

function DashboardTraineePage() {
  return (
    <div className="space-y-6">
      <AccessDashboardItemTrainee />

      <TableBookingTrainee />
    </div>
  );
}

export default DashboardTraineePage;
