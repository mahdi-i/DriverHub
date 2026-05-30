"use client";

import { TypographySpan } from "@/core/components/custom/ui/typography/Typography";
import { Badge } from "@/core/components/shadcn/ui/badge/badge";

import ModalTabelBooking from "@/core/components/custom/ui/booking/modal/ModalTabelBooking";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/core/components/shadcn/ui/table/table";
import { formatDateTime } from "@/core/utils/formatDate";
import { getGender } from "@/core/utils/getGender";
import { getStatusBadgeVariant } from "@/core/utils/getStatusBadgeVariant";
import { getStatusLabel } from "@/core/utils/getStatusLabel";
import { MapPin } from "lucide-react";
import { fakeBookingsTrinee } from "../../../../driver/assets/mock/fakeBookings";
function BodyTabelBookingDashboardTrainee() {
  return (
    <TableBody>
      {fakeBookingsTrinee.length === 0 ? (
        <TableRow>
          <TableCell colSpan={8} className="text-center py-8">
            رکوردی یافت نشد
          </TableCell>
        </TableRow>
      ) : (
        fakeBookingsTrinee.map((booking, index) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>

            <TableCell>
              <div className="flex flex-col gap-1">
                <TypographySpan>{booking.day}</TypographySpan>
              </div>
            </TableCell>

            <TableCell className="text-sm">
              {formatDateTime(booking.startTime)}
            </TableCell>

            <TableCell>
              <div className="flex flex-col gap-1">
                <TypographySpan>{booking.teacher.fullName}</TypographySpan>
              </div>
            </TableCell>

            <TableCell>{getGender(booking.teacher.gender)}</TableCell>

            <TableCell>
              <div className="flex items-center gap-1 text-sm">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                {booking.teacher.city} / {booking.teacher.town}
              </div>
            </TableCell>

            <TableCell>
              <Badge variant={getStatusBadgeVariant(booking.status)}>
                {getStatusLabel(booking.status)}
              </Badge>
            </TableCell>

            <TableCell>
              <ModalTabelBooking booking={booking} />
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
}

export default BodyTabelBookingDashboardTrainee;
