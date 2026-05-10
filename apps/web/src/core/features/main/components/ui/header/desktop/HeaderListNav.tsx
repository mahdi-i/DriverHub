"use client";
import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "../../../../assets/mock/navItems";

export default function HeaderListNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`link-nav-header ${isActive ? "text-primary" : ""}`}
              >
                <TypographyP className="font-normal">{item.label}</TypographyP>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
