import {
  TypographyBig,
  TypographyP,
} from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden ">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white "></div>

      <div className="absolute left-1/4 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full " />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-rose-200/20 blur-3xl dark:bg-rose-500/10" />

      <div className="container flex flex-col items-center justify-center px-4 py-16 text-center">
        <TypographyBig className="mt-6  text-slate-800 dark:text-slate-100 ">
          ۴۰۴
        </TypographyBig>
        <div className="mt-4 text-2xl font-semibold text-slate-700 dark:text-slate-300">
          صفحه پیدا نشد
        </div>
        <TypographyP className="mt-4 max-w-md text-slate-500 dark:text-slate-400">
          متأسفیم، صفحه‌ای که به دنبال آن هستید در سایت رزرو نوبت وجود ندارد.
          شاید آدرس را اشتباه وارد کرده‌اید یا صفحه حذف شده باشد.
        </TypographyP>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" variant="default" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              بازگشت به صفحه اصلی
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/booking">رزرو نوبت جدید</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
