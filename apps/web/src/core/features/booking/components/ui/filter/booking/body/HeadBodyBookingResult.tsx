"use clinet";
import { TypographyMuted } from "@/core/components/custom/ui/typography/Typography";
import { useState } from "react";

import FilterBookingContent from "@/core/features/booking/components/ui/filter/booking/filter/FilterBookingContent";
import BookingFilterSheet from "./BookingFilterSheet.tsx";
import BookingSortOptions from "./BookingSortOptions";
import BookingSortSheet from "./BookingSortSheet";
import { DateNavigator, DateNavigatorMobile } from "./DateNavigator";

function HeadBodyBookingResult() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterOpenSort, setIsFilterOpenSort] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center gap-2 w-full">
          <BookingFilterSheet
            isOpen={isFilterOpen}
            onOpenChange={setIsFilterOpen}
          >
            <div className="mt-8">
              <FilterBookingContent />
            </div>
          </BookingFilterSheet>

          <BookingSortSheet
            isOpen={isFilterOpenSort}
            onOpenChange={setIsFilterOpenSort}
          />
          <div className=" items-center gap-2 p-1  md:hidden flex  w-full sm:w-auto justify-between">
            <DateNavigatorMobile />
          </div>
        </div>

        <div className="hidden md:flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <TypographyMuted className="whitespace-nowrap">
            مرتب‌ سازی:
          </TypographyMuted>
          <BookingSortOptions variant="inline" />
        </div>
      </div>

      <div className=" items-center gap-2 p-1 md:flex hidden w-full sm:w-auto justify-between">
        <DateNavigator />
      </div>
    </div>
  );
}

export default HeadBodyBookingResult;
