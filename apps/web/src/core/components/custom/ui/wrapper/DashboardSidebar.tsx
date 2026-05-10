"use client";
import {
  defaultNavItems,
  driverNavItems,
  traineeNavItems,
} from "@/core/assets/mock/navItems";
import Logo from "@/core/features/main/components/ui/logo/Logo";
import { useIsMobile } from "@/core/hooks/useIsMobile";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
interface DashboardSidebarTs {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function DashboardSidebar({
  sidebarOpen,
  setSidebarOpen,
}: DashboardSidebarTs) {
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
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
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
${isMobile && !sidebarOpen ? "translate-x-full" : "translate-x-0"} bg-white border-l border-muted shadow-sm shadow-muborder-muted/50 `}
      >
        <div className="flex items-center justify-between p-5 border-b border-muted">
          <div className="gap-3 mx-auto">
            <Logo />
          </div>
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-mutborder-muted transition-colors text-gray-500"
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
                  flex items-center gap-3 px-4 py-2.5 rounded-sm transition-all duration-200
                  ${
                    isActive
                      ? "bg-linear-to-r from-primary/15 to-primary/5 text-foreground font-semibold border border-primary/30"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && (
                  <div className="mr-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
