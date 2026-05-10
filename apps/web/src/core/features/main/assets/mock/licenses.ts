import { Bike, Bus, Car, Ship, Truck, Van } from "lucide-react";

export const licenses = [
  {
    id: "",
    name: "ماشین",
    icon: Car,
    href: "/",
    description: "آموزش رانندگی خودروهای سواری",
  },
  {
    id: "motorcycle",
    name: "موتورسیکلت",
    icon: Bike,
    href: "motorcycle",
    description: "آموزش رانندگی موتورسیکلت",
  },
  {
    id: "heavy-motorcycle",
    name: "موتور سنگین",
    icon: Ship, // کشتی برای نشون دادن سنگین بودن
    href: "heavy-motorcycle",
    description: "آموزش رانندگی موتورسیکلت‌های سنگین",
  },
  {
    id: "car-base2",
    name: "پایه دو",
    icon: Bus, // اتوبوس = نیمه سنگین
    href: "car-base2",
    description: "گواهینامه پایه دو (نیمه سنگین)",
  },
  {
    id: "car-base1",
    name: "پایه یک",
    icon: Truck, // کامیون = سنگین
    href: "car-base1",
    description: "گواهینامه پایه یک (سنگین)",
  },
  {
    id: "car-base3",
    name: "پایه سه",
    icon: Van, // ون = سبک
    href: "car-base3",
    description: "گواهینامه پایه سه (سبک)",
  },
];
