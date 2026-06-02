"use client";
import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { licenses } from "../../../assets/mock/licenses";

export function LicenseFilter() {
  const searchParams = usePathname();

  return (
    <div className="  flex gap-5 justify-around border-b border-border">
      {licenses.map((license) => {
        const Icon = license.icon;
        const isActive = searchParams === `/${license.id}`;

        return (
          <Link
            href={`/${license.id}` as Route}
            key={license.id}
            scroll={false}
            className={`
              relative flex flex-col items-center gap-2 p-3 rounded-lg transition-all pb-5
              ${isActive ? "text-secondary" : "text-muted-foreground hover:text-secondary"}
            `}
          >
            <Icon
              className={`
                h-8 w-8 transition-colors
                ${isActive ? "text-secondary" : "text-muted-foreground"}
              `}
            />
            <TypographyP
              className={`
                font-medium text-sm
                ${isActive ? "text-secondary" : "text-muted-foreground"}
              `}
            >
              {license.name}
            </TypographyP>
            {isActive && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-[5.3] bg-secondary rounded-t-full transition-all duration-300"></div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
