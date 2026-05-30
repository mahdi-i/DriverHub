"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/core/components/shadcn/ui/pagination/pagination";
import { usePathname, useSearchParams } from "next/navigation";

export function Paginations({
  pagination,
}: {
  pagination?: {
    limit: number;
    page: number;
    total: number;
    totalPages?: number;
  };
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log(pagination.total);

  const { page, total } = pagination;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  console.log(total);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size="sm"
            href={page > 1 ? createPageURL(page - 1) : undefined}
            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            aria-label="صفحه قبلی"
          />
        </PaginationItem>

        <>
          <PaginationItem>
            <PaginationLink size="sm" href={createPageURL(total)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        </>

        <PaginationItem>
          <PaginationNext
            size="sm"
            href={page < total ? createPageURL(page + 1) : undefined}
            className={page >= total ? "pointer-events-none opacity-50" : ""}
            aria-label="صفحه بعدی"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
