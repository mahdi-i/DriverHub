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

type UserRole = "TEACHER" | "DRIVER";

export function BookingActionsDropdown({
  bookingId,
  status,
  license,
  userRole,
}: {
  bookingId: string;
  status: AppointmentStatus;
  license: string;
  userRole: UserRole;
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
      toast.error("مشکل پیش آمد در انجام عملیات");
    }
  }

  const getMenuItems = () => {
    if (
      status === AppointmentStatus.COMPLETED ||
      status === AppointmentStatus.CANCELLED ||
      status === AppointmentStatus.REJECTED
    ) {
      return (
        <DropdownMenuItem disabled className="text-muted-foreground">
          {status === AppointmentStatus.COMPLETED
            ? "کلاس تکمیل شده است"
            : "کلاس لغو یا رد شده است"}
        </DropdownMenuItem>
      );
    }

    if (userRole === "TEACHER") {
      switch (status) {
        case AppointmentStatus.PENDING:
          return (
            <>
              <DropdownMenuItem
                onClick={() => handleAction("confirm")}
                disabled={isLoading}
                className="cursor-pointer text-success"
              >
                {isLoading ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <Check className="ml-2 h-4 w-4 text-success" />
                )}
                تایید کلاس
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAction("reject")}
                disabled={isLoading}
                className="cursor-pointer text-destructive"
              >
                {isLoading ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <X className="ml-2 h-4 w-4 text-destructive" />
                )}
                رد درخواست
              </DropdownMenuItem>
            </>
          );
        case AppointmentStatus.CONFIRMED:
          return (
            <>
              <DropdownMenuItem
                onClick={() => handleAction("complete")}
                disabled={isLoading}
                className="cursor-pointer text-primary"
              >
                {isLoading ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <Check className="ml-2 h-4 w-4 text-primary" />
                )}
                تکمیل آموزش
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAction("cancel")}
                disabled={isLoading}
                className="cursor-pointer text-orange-400"
              >
                {isLoading ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <X className="ml-2 h-4 w-4 text-orange-400" />
                )}
                لغو کلاس
              </DropdownMenuItem>
            </>
          );
        default:
          return null;
      }
    }

    if (userRole === "DRIVER") {
      switch (status) {
        case AppointmentStatus.PENDING:
          return (
            <DropdownMenuItem disabled className="text-muted-foreground">
              در انتظار تایید استاد...
            </DropdownMenuItem>
          );
        case AppointmentStatus.CONFIRMED:
          return (
            <>
              <DropdownMenuItem
                onClick={() => handleAction("complete")}
                disabled={isLoading}
                className="cursor-pointer text-primary"
              >
                {isLoading ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <Check className="ml-2 h-4 w-4 text-primary" />
                )}
                اعلام پایان کلاس
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAction("cancel")}
                disabled={isLoading}
                className="cursor-pointer text-orange-400"
              >
                {isLoading ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <X className="ml-2 h-4 w-4 text-orange-400" />
                )}
                انصراف از کلاس
              </DropdownMenuItem>
            </>
          );
        default:
          return null;
      }
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
