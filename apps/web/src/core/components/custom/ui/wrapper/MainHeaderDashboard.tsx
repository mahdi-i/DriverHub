"use client";
import { Input } from "@/core/components/shadcn/ui/input/input";
import { useIsMobile } from "@/core/hooks/useIsMobile";
import { Bell, Menu, Search } from "lucide-react";

interface MainHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export function MainHeader({ setSidebarOpen }: MainHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header className="flex items-center justify-between px-5 py-2 border-b border-white/5 bg-[#1e293b]/50 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div className="hidden md:flex items-center gap-2 px-4 py-1 rounded-lg bg-white/5 border border-white/8 hover:border-white/15 transition-colors cursor-text">
          <Search className="h-4 w-4 text-white/40" />
          <Input
            type="text"
            placeholder="جستجو..."
            className="bg-transparent text-white placeholder:text-white/40 outline-none text-sm w-48"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#fdb913] shadow-lg shadow-[#fdb913]/50" />
        </button>

        <div className="flex items-center gap-3 pl-3 border-r border-white/8">
          <div className="hidden sm:block text-left mr-2">
            <p className="text-sm font-medium text-white">علی محمدی</p>
            <p className="text-xs text-white/40">مدیر سیستم</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-[#0077db] to-[#005bb5] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#0077db]/20">
            ع
          </div>
        </div>
      </div>
    </header>
  );
}
