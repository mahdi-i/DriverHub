import { Bike, Bus, Car, Truck } from "lucide-react";

export const licenses = [
  {
    id: "",
    name: "ماشین سواری",
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
    icon: Bike,
    href: "heavy-motorcycle",
    description: "آموزش رانندگی موتورسیکلت‌های سنگین",
  },

  {
    id: "car-base2",
    name: "پایه دو",
    icon: Bus,
    href: "car-base2",
    description: "گواهینامه پایه دو (نیمه سنگین)",
  },
  {
    id: "car-base1",
    name: "پایه یک",
    icon: Truck,
    href: "car-base1",
    description: "گواهینامه پایه یک (سنگین)",
  },
];
