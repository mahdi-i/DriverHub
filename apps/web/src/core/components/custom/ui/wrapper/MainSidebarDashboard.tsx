"use client";
import Logo from "@/core/features/main/components/ui/logo/Logo";
import { useIsMobile } from "@/core/hooks/useIsMobile";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

interface MainSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const defaultNavItems = [{ href: "/", label: "داشبورد", icon: "🏠" }];

const driverNavItems = [
  { href: "/dashboard/driver", label: "پنل کاربری", icon: "🏠" },
  { href: "/dashboard/driver/profile", label: "پروفایل", icon: "👤" },
  { href: "/dashboard/driver/schedule", label: "برنامه", icon: "📅" },
  { href: "/dashboard/driver/bookings", label: "رزروها", icon: "📝" },
  { href: "/dashboard/driver/analysis", label: "آمار", icon: "📊" },
  { href: "/dashboard/driver/settings", label: "تنظیمات", icon: "⚙️" },
];

const traineeNavItems = [
  { href: "/dashboard/trainee", label: "پنل کاربری", icon: "🏠" },
  { href: "/dashboard/trainee/profile", label: "پروفایل", icon: "👤" },
  { href: "/dashboard/trainee/bookings", label: "رزروها", icon: "📝" },
  { href: "/dashboard/trainee/schedule", label: "برنامه آموزشی", icon: "📅" },
  { href: "/dashboard/trainee/progress", label: "پیشرفت", icon: "📈" },
  { href: "/dashboard/trainee/settings", label: "تنظیمات", icon: "⚙️" },
];

export function MainSidebar({ sidebarOpen, setSidebarOpen }: MainSidebarProps) {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  // انتخاب آیتم‌ها بر اساس مسیر
  const navItems = useMemo(() => {
    if (pathname.includes("/driver")) {
      return driverNavItems;
    }
    if (pathname.includes("/trainee")) {
      return traineeNavItems;
    }
    return defaultNavItems;
  }, [pathname]);

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
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* سایدبار */}
      <aside
        className={`
          ${
            isMobile
              ? "fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out"
              : "relative w-64 shrink-0"
          }
          ${isMobile && !sidebarOpen ? "translate-x-full" : "translate-x-0"}

          flex flex-col
          bg-white border-l border-gray-200
          shadow-lg shadow-gray-200/50
        `}
      >
        {/* هدر */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="gap-3 mx-auto">
            <Logo />
          </div>
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* ناوبری */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#fdb913]/15 to-[#fdb913]/5 text-[#1f2937] font-semibold border border-[#fdb913]/30"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && (
                  <div className="mr-auto w-1.5 h-1.5 rounded-full bg-[#fdb913]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* فوتر */}
        <div className="p-4 border-t border-gray-100">
          <div className="px-3 py-2 flex justify-between">
            <p className="text-xs text-gray-400">نسخه</p>
            <p className="text-sm text-gray-600 font-medium">v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
