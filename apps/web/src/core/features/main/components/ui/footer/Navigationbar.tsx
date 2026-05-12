"use client";
import { TypographySpan } from "@/core/components/custom/ui/typography/Typography";
import ModalAuthHeader from "@/core/features/auth/components/blocks/auth/ModalAuthHeader";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { navigationitems } from "../../../assets/mock/navigation";

function Navigationbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleOpenModal() {
    setIsAuthModalOpen(true);

    const params = new URLSearchParams(searchParams);
    params.set("auth", "open");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
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
          router.push(newUrl, { scroll: false });
        }
      }
    }
  }, [isAuthModalOpen, pathname, router, searchParams]);

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background shadow-sm md:hidden">
      <ModalAuthHeader
        setIsAuthModalOpen={setIsAuthModalOpen}
        isAuthModalOpen={isAuthModalOpen}
      />
      <div className="flex items-center justify-around py-2">
        {navigationitems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href === "/auth" ? "/" : item.href}
              className={`flex h-auto flex-col items-center gap-1 px-2 py-1 transition-colors duration-200 ${
                isActive ? "text-secondary font-bold" : "text-muted-foreground"
              }`}
              onClick={() => (item.href === "/auth" ? handleOpenModal() : "")}
            >
              <Icon
                className={`h-5 w-5 ${isActive ? "stroke-secondary" : "stroke-muted-foreground"}`}
              />
              <TypographySpan className="text-sm">{item.name}</TypographySpan>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Navigationbar;
