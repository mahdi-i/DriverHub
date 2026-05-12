import { DropdownMenuItem } from "@/core/components/shadcn/ui/dropdown-menu/dropdown-menu";
import { AppointmentStatus } from "@driverhub/shared-types";
import { Check, X } from "lucide-react";

export function getActions(status: AppointmentStatus) {
  switch (status) {
    case AppointmentStatus.PENDING:
      return (
        <>
          <DropdownMenuItem className="cursor-pointer">
            <Check className="ml-2 h-4 w-4 text-success" />
            تأیید
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <X className="ml-2 h-4 w-4 text-destructive" />
            رد
          </DropdownMenuItem>
        </>
      );
    case AppointmentStatus.CONFIRMED:
      return (
        <>
          <DropdownMenuItem className="cursor-pointer">
            <Check className="ml-2 h-4 w-4 text-success" />
            تکمیل
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <X className="ml-2 h-4 w-4 text-destructive" />
            لغو
          </DropdownMenuItem>
        </>
      );
    default:
      return (
        <DropdownMenuItem disabled className="text-muted-foreground">
          اقدامی موجود نیست
        </DropdownMenuItem>
      );
  }
}
