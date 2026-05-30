import { Button } from "@/core/components/shadcn/ui/button/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/core/components/shadcn/ui/sheet/sheet";
import { Filter } from "lucide-react";
import { ReactNode } from "react";

interface FilterSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

function BookingFilterSheet({
  isOpen,
  onOpenChange,
  children,
}: FilterSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden border gap-2">
          <Filter className="w-4 h-4" />
          فیلترها
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-75 sm:w-100 overflow-y-auto">
        {children}
      </SheetContent>
    </Sheet>
  );
}

export default BookingFilterSheet;
