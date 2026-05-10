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
  { href: "/", label: "داشبورد", icon: "🏠" },
  { href: "/dashboard/driver", label: "پنل کاربری", icon: "👤" },
  { href: "/dashboard/driver/profile", label: "پروفایل", icon: "📋" },
  { href: "/dashboard/driver/schedule", label: "برنامه", icon: "📅" },
  { href: "/dashboard/driver/bookings", label: "رزروها", icon: "📝" },
  { href: "/dashboard/driver/analysis", label: "آمار", icon: "📊" },
  { href: "/dashboard/driver/settings", label: "تنظیمات", icon: "⚙️" },
];

const traineeNavItems = [
  { href: "/", label: "داشبورد", icon: "🏠" },
  { href: "/dashboard/trainee", label: "پنل کاربری", icon: "👤" },
  { href: "/dashboard/trainee/profile", label: "پروفایل", icon: "📋" },
  { href: "/dashboard/trainee/bookings", label: "رزروها", icon: "📝" },
  { href: "/dashboard/trainee/schedule", label: "برنامه آموزشی", icon: "📅" },
  { href: "/dashboard/trainee/progress", label: "پیشرفت", icon: "📈" },
  { href: "/dashboard/trainee/settings", label: "تنظیمات", icon: "⚙️" },
];
export function MainSidebar({ sidebarOpen, setSidebarOpen }: MainSidebarProps) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
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
    if (isMobile) {
      document.body.style.overflow = sidebarOpen ? "hidden" : "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, sidebarOpen]);

  return (
    <>
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          ${
            isMobile
              ? "fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out"
              : "relative w-64 shrink-0"
          }
          ${isMobile && !sidebarOpen ? "translate-x-full" : "translate-x-0"}

          flex flex-col backdrop-blur-xl
          bg-[#1e293b]/80 border-r border-white/5
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="gap-3 mx-auto">
            <Logo />
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

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-sm transition-all duration-200
                  ${
                    isActive
                      ? "bg-linear-to-r from-[#fdb913]/20 to-[#fdb913]/10 text-[#fdb913] border border-[#fdb913]/30"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-1 border-t border-white/5">
          <div className="px-3 py-2 flex justify-between">
            <p className="text-xs text-white/30">نسخه</p>
            <p className="text-sm text-white/60 font-medium">v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
