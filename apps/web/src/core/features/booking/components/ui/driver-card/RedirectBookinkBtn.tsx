"use client";

import { Button } from "@/core/components/shadcn/ui/button/button";
import { redirect } from "next/navigation";
import BookingModalDriverMoreInfo from "./modal/BookingModalDriverMoreInfo";

function RedirectBookinkBtn({ driver }) {
  return (
    <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-2 sm:gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
      <div className="flex-col flex  w-full md:flex gap-2">
        <Button
          size="sm"
          variant="default"
          className="w-full"
          onClick={() => redirect(`/booking/${driver.id}`)}
        >
          رزرو
        </Button>
        <BookingModalDriverMoreInfo driver={driver} />
      </div>
    </div>
  );
}

export default RedirectBookinkBtn;
