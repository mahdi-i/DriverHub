import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Calendar, Headphones, User } from "lucide-react";
import Link from "next/link";

export default function HeaderActions() {
  return (
    <div className="flex items-center ">
      <Button variant="ghost" className="gap-2">
        <Link href="/support" className="flex items-center gap-2">
          <Headphones className="h-6 w-6 " />
          <TypographyP className="font-medium">پشتیبانی</TypographyP>
        </Link>
      </Button>

      <Button variant="ghost" className="gap-2">
        <Link
          href="/dashboard/reservations"
          className="flex items-center gap-2"
        >
          <Calendar className="h-6 w-6 " />
          <TypographyP className="font-medium">رزروهای من</TypographyP>
        </Link>
      </Button>

      <Button variant="default" className="gap-2">
        <Link href="/auth/login" className="flex items-center gap-2">
          <User className="h-6 w-6 " />
          <TypographyP className="font-medium">ورود یا ثبت نام</TypographyP>
        </Link>
      </Button>
    </div>
  );
}
