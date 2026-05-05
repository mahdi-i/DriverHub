"use client";
import { TypographyLarge } from "@/core/components/custom/ui/typography/Typography";
import { BookOpen, Calendar, Contact, Home, Info, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderListNav() {
  const searchParams = usePathname();
  console.log(searchParams);
  return (
    <nav>
      <ul className="flex gap-6">
        <li>
          <Link
            href="/"
            className={`link-nav-header ${searchParams === "/" ? "text-primary" : ""}`}
          >
            <Home className="h-5 w-5" />
            <TypographyLarge className=" font-normal ">خانه</TypographyLarge>
          </Link>
        </li>
        <li>
          <Link
            href="/instructors"
            className={`link-nav-header ${searchParams === "/instructors" ? "text-primary" : ""}`}
          >
            <Users className="h-5 w-5" />
            <TypographyLarge className=" font-normal transition-colors">
              مربیان
            </TypographyLarge>
          </Link>
        </li>
        <li>
          <Link
            href="/booking"
            className={`link-nav-header ${searchParams === "/booking" ? "text-primary" : ""}`}
          >
            <Calendar className="h-5 w-5" />
            <TypographyLarge className=" font-normal transition-colors">
              رزرو نوبت
            </TypographyLarge>
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={`link-nav-header ${searchParams === "/blog" ? "text-primary" : ""}`}
          >
            <BookOpen className="h-5 w-5" />
            <TypographyLarge className=" font-normal transition-colors">
              مجله
            </TypographyLarge>
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`link-nav-header ${searchParams === "/about" ? "text-primary" : ""}`}
          >
            <Info className="h-5 w-5" />
            <TypographyLarge className=" font-normal transition-colors">
              درباره ما
            </TypographyLarge>
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`link-nav-header ${searchParams === "/contact" ? "text-primary" : ""}`}
          >
            <Contact className="h-5 w-5" />
            <TypographyLarge className=" font-normal transition-colors">
              تماس با ما
            </TypographyLarge>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
