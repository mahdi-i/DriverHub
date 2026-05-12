"use client";

import Modal from "@/core/components/custom/ui/modal/Modal";
import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/core/components/shadcn/ui/dropdown-menu/dropdown-menu";
import { fakeBookingsTrinee } from "@/core/features/driver/assets/mock/fakeBookings";
import { getActions } from "@/core/features/driver/utils/getActionsBooking";
import { getGender } from "@/core/utils/getGender";
import {
  AlertCircle,
  Calendar,
  Eye,
  Glasses,
  MoreHorizontal,
  User,
} from "lucide-react";
import { useState } from "react";

function ModalTabelBooking({ booking }) {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );

  const selectedBooking = fakeBookingsTrinee.find(
    (booking) => booking.id === selectedBookingId,
  );
  return (
    <div className="flex items-center gap-1">
      <Modal
        title="اطلاعات کلاس"
        open={selectedBookingId === booking.id}
        onOpenChange={(open) => setSelectedBookingId(open ? booking.id : null)}
        trigger={<Eye size={18} />}
      >
        {selectedBookingId === booking.id && selectedBooking && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <TypographyP className="text-sm text-muted-foreground">
                    نام
                  </TypographyP>
                  <TypographyP className="font-medium">
                    {booking.teacher.fullName}
                  </TypographyP>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <TypographyP className="text-sm text-muted-foreground">
                    روز
                  </TypographyP>
                  <TypographyP className="font-medium">
                    {booking.day} 
                  </TypographyP>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <TypographyP className="text-sm text-muted-foreground">
                  جنسیت
                </TypographyP>
                <TypographyP className="font-medium">
                  {getGender(booking.teacher.gender)}
                </TypographyP>
              </div>
              <div>
                <TypographyP className="text-sm text-muted-foreground">
                  استان / شهر
                </TypographyP>
                <TypographyP className="font-medium">
                  {booking.teacher.city} / {booking.teacher.town}
                </TypographyP>
              </div>
            </div>

            {/* <div className="flex items-center gap-2">
              <Glasses className="h-4 w-4 text-muted-foreground" />
              <div>
                <TypographyP className="text-sm text-muted-foreground">
                  عینک
                </TypographyP>
                <TypographyP className="font-medium">
                  {booking.student.hasGlasses ? "بله" : "خیر"}
                </TypographyP>
              </div>
            </div> */}
{/* 
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground mt-1" />
              <div>
                <TypographyP className="text-sm text-muted-foreground">
                  بیماری یا شرایط خاص
                </TypographyP>
                <TypographyP className="font-medium">
                  {booking.student.medicalConditions || "ندارد"}
                </TypographyP>
              </div>
            </div> */}

            {booking.note && (
              <div className="rounded-lg bg-muted p-3">
                <TypographyP className="text-sm text-muted-foreground">
                  یادداشت
                </TypographyP>
                <TypographyP className="font-medium">
                  {booking.note}
                </TypographyP>
              </div>
            )}
          </div>
        )}
      </Modal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {getActions(booking.status)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ModalTabelBooking;
