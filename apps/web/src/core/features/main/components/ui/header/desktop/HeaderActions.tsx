"use client";
import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Roles } from "@driverhub/shared-types";
import { Calendar, User } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function HeaderActions({
  setIsAuthModalOpen,
  isAuthModalOpen,
  role,
}: {
  setIsAuthModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthModalOpen?: boolean;
  role: Roles;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleOpenModal() {
    setIsAuthModalOpen(true);

    const params = new URLSearchParams(searchParams);
    params.set("auth", "open");
    router.push(`${pathname}?${params.toString()}` as Route, { scroll: false });
  }

  useEffect(() => {
    if (!isAuthModalOpen) {
      const params = new URLSearchParams(searchParams);
      const hadAuthParam = params.has("auth");

      if (hadAuthParam) {
        params.delete("auth");
        const newUrl = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname;

        if (
          newUrl !==
          `${pathname}${searchParams.toString() ? "?" + searchParams.toString() : ""}`
        ) {
          router.push(newUrl as Route, { scroll: false });
        }
      }
    }
  }, [isAuthModalOpen, pathname, router, searchParams]);
  return (
    <div className="flex items-center ">
      <Button variant="ghost" className="gap-2">
        <Link
          href="/dashboard/driver/bookings"
          className="flex items-center gap-2"
        >
          <Calendar className="h-6 w-6 " />
          <TypographyP className="font-medium">رزروهای من</TypographyP>
        </Link>
      </Button>
      {role ? (
        role === Roles.TEACHER ? (
          <Button>
            <Link href={"/dashboard/driver"}>ورود به پنل</Link>
          </Button>
        ) : (
          <Button>
            <Link href={"/dashboard/trainee"}>ورود به پنل</Link>
          </Button>
        )
      ) : (
        <Button className="gap-2" onClick={handleOpenModal}>
          <>
            <User className="h-6 w-6 " />
            <TypographyP>ورود یا ثبت نام</TypographyP>
          </>
        </Button>
      )}
    </div>
  );
}
