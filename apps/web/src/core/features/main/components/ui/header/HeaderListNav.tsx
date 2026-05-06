"use client";
import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
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
            className={`link-nav-header  ${searchParams === "/" ? "text-primary" : ""}`}
          >
            <Home className="h-5 w-5" />
            <TypographyP className=" font-normal mb-2">خانه</TypographyP>
          </Link>
        </li>
        <li>
          <Link
            href="/instructors"
            className={`link-nav-header ${searchParams === "/instructors" ? "text-primary" : ""}`}
          >
            <Users className="h-5 w-5" />
            <TypographyP className=" font-normal mb-2">مربیان</TypographyP>
          </Link>
        </li>
        <li>
          <Link
            href="/booking"
            className={`link-nav-header  ${searchParams === "/booking" ? "text-primary" : ""}`}
          >
            <Calendar className="h-5 w-5" />
            <TypographyP className=" font-normal mb-2">رزرو نوبت</TypographyP>
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={`link-nav-header ${searchParams === "/blog" ? "text-primary" : ""}`}
          >
            <BookOpen className="h-5 w-5" />
            <TypographyP className=" font-normal mb-2">مجله</TypographyP>
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`link-nav-header ${searchParams === "/about" ? "text-primary" : ""}`}
          >
            <Info className="h-5 w-5" />
            <TypographyP className=" font-normal mb-2">درباره ما</TypographyP>
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`link-nav-header ${searchParams === "/contact" ? "text-primary" : ""}`}
          >
            <Contact className="h-5 w-5" />
            <TypographyP className=" font-normal mb-2">تماس با ما</TypographyP>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
