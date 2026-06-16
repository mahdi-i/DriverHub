import { Button } from "@/core/components/shadcn/ui/button/button";
import NumberInputBookingFilter from "./NumberInputBookingFilter";
import SearchInputFilterBooking from "./SearchInputFilterBooking";
import SelectorBookingFilter from "./SelectorBookingFilter";
function FilterBookingContent() {
  return (
    <div className="space-y-6 p-2 ">
      <SearchInputFilterBooking />

      <div className="h-px w-full bg-border" />

      <SelectorBookingFilter />

      <div className="h-px w-full bg-border" />

      <NumberInputBookingFilter />

      <Button className="w-full mt-2">اعمال فیلترها</Button>
    </div>
  );
}

export default FilterBookingContent;
