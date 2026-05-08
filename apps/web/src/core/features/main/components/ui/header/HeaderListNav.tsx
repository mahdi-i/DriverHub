"use client";
import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
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
            href="/instructors"
            className={`link-nav-header ${searchParams === "/instructors" ? "text-primary" : ""}`}
          >
            <TypographyP className=" font-normal ">مربیان</TypographyP>
          </Link>
        </li>
        <li>
          <Link
            href="/booking"
            className={`link-nav-header  ${searchParams === "/booking" ? "text-primary" : ""}`}
          >
            <TypographyP className=" font-normal ">رزرو نوبت</TypographyP>
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={`link-nav-header ${searchParams === "/blog" ? "text-primary" : ""}`}
          >
            <TypographyP className=" font-normal ">مجله</TypographyP>
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`link-nav-header ${searchParams === "/about" ? "text-primary" : ""}`}
          >
            <TypographyP className=" font-normal ">درباره ما</TypographyP>
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`link-nav-header ${searchParams === "/contact" ? "text-primary" : ""}`}
          >
            <TypographyP className=" font-normal ">تماس با ما</TypographyP>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
