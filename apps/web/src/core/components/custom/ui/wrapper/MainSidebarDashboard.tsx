"use client";
import { useIsMobile } from "@/core/hooks/useIsMobile";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface MainSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const navItems = [
  { href: "/", label: "داشبورد", icon: "🏠" },
  { href: "/bookings", label: "رزروها", icon: "📅" },
  { href: "/users", label: "کاربران", icon: "👥" },
  { href: "/settings", label: "تنظیمات", icon: "⚙️" },
];

export function MainSidebar({ sidebarOpen, setSidebarOpen }: MainSidebarProps) {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = sidebarOpen ? "hidden" : "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, sidebarOpen]);

  return (
    <>
      {/* اورلی تیره */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* سایدبار */}
      <aside
        className={`
          ${
            isMobile
              ? "fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out"
              : "relative w-64 flex-shrink-0"
          }
          ${isMobile && !sidebarOpen ? "translate-x-full" : "translate-x-0"}

          flex flex-col backdrop-blur-xl
          bg-[#1e293b]/80 border-r border-white/[0.05]
        `}
      >
        {/* هدر سایدبار */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.05]">
          <div className="flex items-center gap-3">
            {/* لوگو */}
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#fdb913] to-[#e3a107] flex items-center justify-center shadow-lg shadow-[#fdb913]/20">
              <span className="text-[#1f2937] font-bold text-sm">آ</span>
            </div>
            <span className="text-white font-bold">آکادمی</span>
          </div>

          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* لینک‌ها */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#fdb913]/20 to-[#fdb913]/10 text-[#fdb913] border border-[#fdb913]/30"
                      : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* فوتر */}
        <div className="p-4 border-t border-white/[0.05]">
          <div className="px-3 py-2">
            <p className="text-xs text-white/30">نسخه</p>
            <p className="text-sm text-white/60 font-medium">v2.0.26</p>
          </div>
        </div>
      </aside>
    </>
  );
}
