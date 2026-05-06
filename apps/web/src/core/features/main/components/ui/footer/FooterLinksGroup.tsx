import { TypographyLarge } from "@/core/components/custom/ui/typography/Typography";
import Link from "next/link";

export default function FooterLinksGroup({ title, links }) {
  return (
    <div>
      <TypographyLarge className="font-bold mb-4 block">
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
  );
}
