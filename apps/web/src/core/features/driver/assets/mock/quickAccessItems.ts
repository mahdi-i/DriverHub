import { BarChart3, Calendar, FileText, Home, User } from "lucide-react";

export const quickAccessItems = [
  {
    href: "/dashboard/driver/schedule",
    label: "برنامه امروز",
    icon: Calendar,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
  },
  {
    href: "/",
    label: "صفحه اصلی",
    icon: Home,
    color: "text-foreground bg-foreground/20 dark:bg-foreground/20",
  },
  {
    href: "/dashboard/driver/settings",
    label: "تنظیمات داشبورد",
    icon: Calendar,
    color: "text-primary bg-primary/20 dark:bg-primary/20",
  },
  {
    href: "/dashboard/driver/bookings",
    label: "رزروهای من",
    icon: FileText,
    color: "text-green-500 bg-green-50 dark:bg-green-900/20",
  },
  {
    href: "/dashboard/driver/profile",
    label: "پروفایل راننده",
    icon: User,
    color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
  },
  {
    href: "/dashboard/driver/analysis",
    label: "آمار و عملکرد",
    icon: BarChart3,
    color: "text-orange-500 bg-orange-50 dark:bg-orange-900/20",
  },
];

export const quickAccessItemsTrainee = [
  {
    href: "/dashboard/trainee/schedule",
    label: "برنامه امروز",
    icon: Calendar,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
  },
  {
    href: "/",
    label: "صفحه اصلی",
    icon: Home,
    color: "text-foreground bg-foreground/20 dark:bg-foreground/20",
  },
  {
    href: "/dashboard/trainee/settings",
    label: "تنظیمات داشبورد",
    icon: Calendar,
    color: "text-primary bg-primary/20 dark:bg-primary/20",
  },
  {
    href: "/dashboard/trainee/bookings",
    label: "رزروهای من",
    icon: FileText,
    color: "text-green-500 bg-green-50 dark:bg-green-900/20",
  },
  {
    href: "/dashboard/trainee/profile",
    label: "پروفایل",
    icon: User,
    color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
  },
];
