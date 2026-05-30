import { BookOpen, Calendar, Info, Mail, Users } from "lucide-react";
export const navItems = [
  {
    href: "/instructors",
    label: "مربیان",
  },
  {
    href: "/booking",
    label: "رزرو نوبت",
  },

  {
    href: "/about",
    label: "درباره ما",
  },
  {
    href: "/contact",
    label: "تماس با ما",
  },
];
export const navItemsMobile = [
  {
    href: "/instructors",
    label: "مربیان",
    icon: Users,
  },
  {
    href: "/booking",
    label: "رزرو نوبت",
    icon: Calendar,
  },
  {
    href: "/blog",
    label: "مجله",
    icon: BookOpen,
  },
  {
    href: "/about",
    label: "درباره ما",
    icon: Info,
  },
  {
    href: "/contact",
    label: "تماس با ما",
    icon: Mail,
  },
];
