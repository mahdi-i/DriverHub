import { Input } from "@/core/components/shadcn/ui/input/input";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { Bell, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { TypographyP } from "../typography/Typography";

export function DashboardHeader({
  setSidebarOpen,
  driverId,
}: {
  setSidebarOpen: (open: boolean) => void;
  driverId?: string;
}) {
  const [userFullname, setUserFullname] =
    useState<string>("در حال بارگذاری...");
  useEffect(() => {
    async function getSummaryInfo() {
      const res = await fetch(
        `${BASE_URL}/profile-driver/summary-driver/${driverId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      console.log(data, "datadatadatadatadata");
      if (data && data.fullName) {
        setUserFullname(data.fullName);
      } else {
        setUserFullname("کاربر مهمان");
      }
    }

    getSummaryInfo();
  }, [driverId]);
  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-sm hover:bg-gray-100 transition-colors text-light md:hidden block"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <Input type="text" placeholder="جستجو..." />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-sm hover:bg-white transition-colors text-light">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
        </button>

        <div className="flex items-center gap-3 pl-3  border-r border-gray-200">
          <div className="hidden sm:block text-left ">
            <TypographyP className=" text-gray-900">{userFullname}</TypographyP>
          </div>
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-secondary to-secondary/90 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-secondary/20">
            {userFullname.substring(1, 0)}
          </div>
        </div>
      </div>
    </header>
  );
}
