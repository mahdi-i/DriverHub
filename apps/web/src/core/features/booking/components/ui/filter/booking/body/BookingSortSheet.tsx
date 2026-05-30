import { Button } from "@/core/components/shadcn/ui/button/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/core/components/shadcn/ui/sheet/sheet";
import { Filter } from "lucide-react";
import BookingSortOptions from "./BookingSortOptions";

interface SortSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function BookingSortSheet({ isOpen, onOpenChange }: SortSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden border gap-2">
          <Filter className="w-4 h-4" />
          چیدمان
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-75 sm:w-100 overflow-y-auto">
        <SheetHeader className="pb-4 border-b mb-4">
          <SheetTitle className="flex items-center gap-2">
            <BookingSortOptions variant="mobile" />
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default BookingSortSheet;
