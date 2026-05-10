"use client";
import { useIsMobile } from "@/core/hooks/useIsMobile";
import { Bell, Menu, Search } from "lucide-react";

interface MainHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export function MainHeader({ setSidebarOpen }: MainHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 hover:border-[#fdb913]/50 transition-colors cursor-text">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو..."
            className="bg-transparent text-gray-900 placeholder:text-gray-400 outline-none text-sm w-48"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#fdb913]" />
        </button>

        <div className="flex items-center gap-3 pl-3  border-r border-gray-200">
          <div className="hidden sm:block text-left ">
            <p className="text-sm font-medium text-gray-900">علی محمدی</p>
            <p className="text-xs text-gray-500">مدیر سیستم</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-[#0077db] to-[#005bb5] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#0077db]/20">
            ع
          </div>
        </div>
      </div>
    </header>
  );
}
