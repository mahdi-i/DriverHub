"use client";

import {
  adminNavItems,
  defaultNavItems,
  driverNavItems,
  traineeNavItems,
} from "@/core/assets/mock/navItems";
import { Button } from "@/core/components/shadcn/ui/button/button";
import Logo from "@/core/features/main/components/ui/logo/Logo";
import { useIsMobile } from "@/core/hooks/useIsMobile";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

export function DashboardSidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = useMemo(() => {
    if (pathname.includes("/driver")) return driverNavItems;
    if (pathname.includes("/trainee")) return traineeNavItems;
    if (pathname.includes("/admin")) return adminNavItems;
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

  async function logOut() {
    try {
      const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "مشکل در خروج از حساب");
        return;
      }

      toast.success("با موفقیت خارج شدید");

      router.refresh();
      router.replace("/");
    } catch {
      toast.error("خطا در ارتباط با سرور");
    }
  }

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
          ${
            isMobile && !sidebarOpen ? "translate-x-full" : "translate-x-0"
          } bg-white border-l border-muted shadow-sm
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-muted">
          <div className="mx-auto">
            <Logo />
          </div>

          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 p-3 flex flex-col justify-between">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-sm transition-all
                    ${
                      isActive
                        ? "bg-primary/10 text-black font-semibold"
                        : "text-gray-500 hover:text-black hover:bg-gray-50"
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>

                  {isActive && (
                    <div className="mr-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>
          <Button
            size="sm"
            className="w-full mt-3"
            onClick={() => router.push("/")}
          >
            صفحه اصلی
          </Button>

          <Button
            variant="destructive"
            size="sm"
            className="w-full mt-1"
            onClick={logOut}
          >
            خروج از حساب
          </Button>
        </nav>
      </aside>
    </>
  );
}
