"use client";

import { TypographyLarge } from "@/core/components/custom/ui/typography/Typography";
import { useIsMobile } from "@/core/hooks/useIsMobile";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FooterLinksGroup({ title, links }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      {isMobile ? (
        <div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={toggleOpen}
          >
            <TypographyLarge className="font-medium mb-4 block">
              {title}
            </TypographyLarge>

            <ArrowDown
              className={`
                text-gray-400 transition-transform duration-300
                ${open ? "rotate-180" : ""}
              `}
            />
          </div>

          {open && (
            <ul className="space-y-2 mt-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div>
          <TypographyLarge className="font-medium mb-4 block">
            {title}
          </TypographyLarge>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
