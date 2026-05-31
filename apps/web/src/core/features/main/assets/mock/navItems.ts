import { BookOpen, Calendar, Info, Mail, Users } from "lucide-react";
export const navItems = [
  {
    href: "/",
    label: "خانه",
  },
  {
    href: "/booking",
    label: "رزرو نوبت",
  },

  {
    href: "/more/about",
    label: "درباره ما",
  },
  {
    href: "/more/contact",
    label: "تماس با ما",
  },
];
export const navItemsMobile = [
  {
    href: "/",
    label: "خانه",
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
    href: "/more/about",
    label: "درباره ما",
    icon: Info,
  },
  {
    href: "/more/contact",
    label: "تماس با ما",
    icon: Mail,
  },
];
