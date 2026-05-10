import { ReactNode } from "react";

interface ContainerDashboardProps {
  children: ReactNode;
  className?: string;
}

function ContainerDashboard({ children, className }: ContainerDashboardProps) {
  return (
    <div
      className={`p-4 md:p-6 bg-gray-50 min-h-screen ${(
        className || ""
      ).trim()}`}
    >
      {children}
    </div>
  );
}

export default ContainerDashboard;
