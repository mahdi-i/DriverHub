import { Bike, Bus, Car, Truck } from "lucide-react";

export const licenses = [
  {
    id: "car",
    name: "ماشین سواری",
    icon: Car,
    href: "?licenseType=car",
    description: "آموزش رانندگی خودروهای سواری",
  },
  {
    id: "motorcycle",
    name: "موتورسیکلت",
    icon: Bike,
    href: "?licenseType=motorcycle",
    description: "آموزش رانندگی موتورسیکلت",
  },
  {
    id: "heavy_motorcycle",
    name: "موتور سنگین",
    icon: Bike,
    href: "?licenseType=heavy_motorcycle",
    description: "آموزش رانندگی موتورسیکلت‌های سنگین",
  },
  {
    id: "base3",
    name: "پایه سه",
    icon: Car,
    href: "?licenseType=base3",
    description: "گواهینامه پایه سه (شخصی)",
  },
  {
    id: "base2",
    name: "پایه دو",
    icon: Bus,
    href: "?licenseType=base2",
    description: "گواهینامه پایه دو (نیمه سنگین)",
  },
  {
    id: "base1",
    name: "پایه یک",
    icon: Truck,
    href: "?licenseType=base1",
    description: "گواهینامه پایه یک (سنگین)",
  },
];
