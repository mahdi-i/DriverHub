"use client";

import Logo from "@/core/features/main/components/ui/logo/Logo";
import { useIsMobile } from "@/core/hooks/useIsMobile";
import {
  BarChart,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  CreditCard,
  FileText,
  Scissors,
  User,
  UserCircle,
  Users,
  WorkflowIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";

interface MainSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface SubNavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface NavItem {
  name: string;
  href?: string;
  icon: React.ElementType;
  sub?: SubNavItem[];
}
export function MainSidebar({ sidebarOpen, setSidebarOpen }: MainSidebarProps) {
  const isMobile = useIsMobile();
  const [show, setshow] = useState(false);
  const pathname = usePathname();

  const isadmin = pathname.startsWith("/adminbarber");
  const menuItems = [
    {
      name: "برنامه کاری",
      icon: Clock,
      href: "/adminbarber/schedule",
    },
    {
      name: "پروفایل",
      icon: UserCircle,
      href: "/adminbarber/profile",
    },
  ];

  const navItems: NavItem[] = [
    { name: "داشبورد", href: "/barberly/dashboard", icon: BarChart },
    { name: "مشتریان", href: "/barberly/clients", icon: Users },
    { name: "رزرو نوبت", href: "/barberly/appointments", icon: CalendarDays },
    { name: "پروفایل", href: "/barberly/profile", icon: User },
    { name: "زمان کاری", href: "/barberly/worktime", icon: Clock },
    { name: "خدمات آرایشگاه", href: "/barberly/bookType", icon: Scissors },
    { name: "وضعیت پلن", href: "/barberly/plans", icon: CreditCard },
    {
      name: "بیشتر",
      icon: ChevronDown,
      sub: [
        { name: "گزارشات", href: "/barberly/reports", icon: FileText },
        { name: "ادمین داری ؟", href: "/barberly/auth", icon: User },
        { name: "موقعیت شغلی", href: "/barberly/work", icon: WorkflowIcon },
      ],
    },
  ];
  function showsub() {
    setshow(!show);
  }
  return (
    <aside
      className={`${
        isMobile
          ? "fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out bg-secondary-foreground"
          : "w-64 "
      } ${
        isMobile && !sidebarOpen ? "translate-x-full" : "translate-x-0"
      } flex flex-col`}
    >
      <div className="flex justify-between border-b border-gray-700">
        {isMobile && (
          <div className="flex justify-start p-4">
            <button
              className="text-gray-300 hover:text-secondary-100"
              onClick={() => setSidebarOpen(false)}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}
        <span className="flex items-center h-20 transition-transform duration-300 hover:scale-105 group text-secondary-100 ">
          <Logo />
        </span>
      </div>
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1 px-2">
          {(isadmin ? menuItems : navItems).map((item) =>
            item.href ? (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-sm rounded-l-md transition-delay ${
                  pathname === item.href
                    ? "text-gray-600 bg-secondary-100 border-r-4 border-primary"
                    : "text-gray-300 hover:bg-secondary-100/20 hover:text-secondary-100 "
                }`}
              >
                <item.icon className="ml-3 h-5 w-5" />
                {item.name}
              </Link>
            ) : (
              <Fragment key={item.name}>
                <span
                  key={item.name}
                  className={`flex items-center w-full px-4 py-3 text-sm rounded-l-md transition-delay ${
                    pathname === item.href
                      ? "text-gray-600 bg-secondary-100 border-r-4 border-primary"
                      : "text-gray-300 hover:bg-secondary-100/20 hover:text-secondary-100 "
                  }`}
                  onClick={() => showsub()}
                >
                  {" "}
                  {show ? (
                    <ChevronUp className="ml-3 h-5 w-5" />
                  ) : (
                    <item.icon className="ml-3 h-5 w-5" />
                  )}
                  {item.name}
                </span>
                {show
                  ? navItems.map((item: NavItem) => (
                      <div key={item.name}>
                        {item.sub?.map((subItem: SubNavItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => {
                              if (isMobile) setSidebarOpen(false);
                            }}
                            className={`flex items-center w-full px-4 py-3 text-sm rounded-l-md transition-delay mr-4 ${
                              pathname === subItem.href
                                ? "text-gray-600 bg-secondary-100 border-r-4 border-primary"
                                : "text-gray-300 hover:bg-secondary-100/20 hover:text-secondary-100"
                            }`}
                          >
                            <subItem.icon className="ml-3 h-5 w-5" />
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    ))
                  : ""}
              </Fragment>
            ),
          )}
        </nav>
      </div>
    </aside>
  );
}
