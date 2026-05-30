"use client";
import { Button } from "@/core/components/shadcn/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/shadcn/ui/dropdown-menu/dropdown-menu";
import { useBookingActions } from "@/core/hooks/useBookingActions";
import { AppointmentStatus } from "@driverhub/shared-types";
import { Check, Loader2, MoreHorizontal, X } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export function BookingActionsDropdown({
  bookingId,
  status,
  license,
}: {
  bookingId: string;
  status: AppointmentStatus;
  license: string;
}) {
  const { executeAction, isLoading, error } = useBookingActions(
    bookingId,
    license,
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  async function handleAction(
    action: "confirm" | "reject" | "complete" | "cancel",
  ) {
    try {
      await executeAction(action);
      toast.success("عملیات با موفقیت انجام شد");
    } catch {
      toast.error("مشکل پیش آمد");
    }
  }

  const getMenuItems = () => {
    switch (status) {
      case AppointmentStatus.PENDING:
        return (
          <>
            <DropdownMenuItem
              onClick={() => handleAction("confirm")}
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="ml-2 h-4 w-4 text-success" />
              )}
              تأیید
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAction("reject")}
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <X className="ml-2 h-4 w-4 text-destructive" />
              )}
              رد
            </DropdownMenuItem>
          </>
        );
      case AppointmentStatus.CONFIRMED:
        return (
          <>
            <DropdownMenuItem
              onClick={() => handleAction("complete")}
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="ml-2 h-4 w-4 text-success" />
              )}
              تکمیل
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAction("cancel")}
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <X className="ml-2 h-4 w-4 text-destructive" />
              )}
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
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{getMenuItems()}</DropdownMenuContent>
    </DropdownMenu>
  );
}
