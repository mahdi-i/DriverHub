"use client";
import { Bell, Home, MapPin, PlusCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FooterFixed() {
  const pathname = usePathname();

  const items = [
    { name: "خانه", href: "/", icon: Home },
    { name: "پلاس", href: "/plus", icon: PlusCircle },
    { name: "سفرهای من", href: "/trips", icon: MapPin },
    { name: "اعلان‌ها", href: "/notifications", icon: Bell },
    { name: "حساب کاربری", href: "/profile", icon: User },
  ];

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full border-t bg-white shadow-sm md:hidden">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex h-auto flex-col items-center gap-1 px-2 py-1 text-[11px] transition-colors duration-200 ${
                isActive ? "text-blue-500 font-bold" : "text-gray-600"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${isActive ? "stroke-blue-500" : "stroke-gray-600"}`}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
