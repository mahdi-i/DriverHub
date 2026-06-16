"use client";

import { TypographySpan } from "@/core/components/custom/ui/typography/Typography";
import { Badge } from "@/core/components/shadcn/ui/badge/badge";

import { BookingActionsDropdown } from "@/core/components/custom/ui/booking/BookingActionsDropdown";
import ModalTabelBooking from "@/core/components/custom/ui/booking/modal/ModalTabelBooking";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/core/components/shadcn/ui/table/table";
import { BookingRequest } from "@/core/features/booking/assets/types/bookingTs";
import { formatDateTime } from "@/core/utils/formatDate";
import { getGender } from "@/core/utils/getGender";
import { getStatusBadgeVariant } from "@/core/utils/getStatusBadgeVariant";
import { getStatusLabel } from "@/core/utils/getStatusLabel";
import { AlertCircle, Glasses, MapPin } from "lucide-react";
function BodyTabelBookingDashboard({
  bookings,
  license,
}: {
  bookings: BookingRequest[];
  license: string;
}) {
  return (
    <TableBody>
      {bookings.length === 0 ? (
        <TableRow>
          <TableCell colSpan={8} className="text-center py-8">
            رکوردی یافت نشد
          </TableCell>
        </TableRow>
      ) : (
        bookings.map((booking, index) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                <TypographySpan>{booking.student.fullName}</TypographySpan>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  {booking.student.hasGlasses && (
                    <TypographySpan className="flex items-center gap-1 text-secondary text-sm">
                      <Glasses className="h-3 w-3" /> عینکی
                    </TypographySpan>
                  )}
                  {booking.student.medicalConditions && (
                    <TypographySpan className="flex items-center gap-1 text-destructive text-sm">
                      <AlertCircle className="h-3 w-3" />{" "}
                      {booking.student.medicalConditions}
                    </TypographySpan>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell>{booking.student.age}</TableCell>
            <TableCell>{getGender(booking.student.gender)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1 text-sm">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                {booking.student.address} / {booking.student.city || ""}
              </div>
            </TableCell>
            <TableCell className="text-sm">
              {formatDateTime(booking.startTime)}
            </TableCell>
            <TableCell>
              <Badge variant={getStatusBadgeVariant(booking.status)}>
                {getStatusLabel(booking.status)}
              </Badge>
            </TableCell>
            <TableCell className="flex items-center">
              <ModalTabelBooking booking={booking} />
              <BookingActionsDropdown
                bookingId={booking.id}
                status={booking.status}
                license={license}
                userRole={"TEACHER"}
              />
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
}

export default BodyTabelBookingDashboard;
