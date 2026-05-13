
import TableBookingDashboardTrainee from "../../ui/bookings/TableBookingDashboardTrainee";
import AccessDashboardItemTrainee from "../../ui/dashboard/AccessDashboardItemTrainee";

function DashboardTraineePage() {
  return (
    <div className="space-y-6">
      <AccessDashboardItemTrainee />

      <TableBookingDashboardTrainee />

    </div>
  );
}

export default DashboardTraineePage;
