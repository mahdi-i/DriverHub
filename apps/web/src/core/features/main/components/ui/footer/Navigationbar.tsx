"use client";
import Link from "next/link";
import { items } from "../../../assets/mock/navigation";
import { usePathname } from "next/navigation";
import { TypographySpan } from "@/core/components/custom/ui/typography/Typography";

function Navigationbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background shadow-sm md:hidden">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex h-auto flex-col items-center gap-1 px-2 py-1 transition-colors duration-200 ${
                isActive
                  ? "text-secondary font-bold"
                  : "text-muted-foreground"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${isActive ? "stroke-secondary" : "stroke-muted-foreground"}`}
              />
              <TypographySpan className="text-sm">{item.name}</TypographySpan>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Navigationbar;
