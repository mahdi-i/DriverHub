import Link from "next/link";

export default function HeaderListNav() {
  return (
    <nav>
      <ul className="flex gap-6">
        <li>
          <Link href="/">خانه</Link>
        </li>
        <li>
          <Link href="/instructors">مربیان</Link>
        </li>
        <li>
          <Link href="/booking">رزرو نوبت</Link>
        </li>
        <li>
          <Link href="/about">درباره ما</Link>
        </li>
        <li>
          <Link href="/contact">تماس با ما</Link>
        </li>
        <li>
          <Link href="/blog">مجله</Link>
        </li>
      </ul>
    </nav>
  );
}
