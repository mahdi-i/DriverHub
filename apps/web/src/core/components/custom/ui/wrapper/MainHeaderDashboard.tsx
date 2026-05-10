"use client";

import { useIsMobile } from "@/core/hooks/useIsMobile";
import { Menu } from "lucide-react";

interface MainHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export function MainHeader({ setSidebarOpen }: MainHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header className=" border-b border-gray-200 flex items-center justify-between px-4 py-4 md:px-6">
      <div className="flex items-center">
        {isMobile && (
          <button
            className="ml-2 text-gray-600 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
      </div>
    </header>
  );
}
