"use client";

import { TypographySpan } from "@/core/components/custom/ui/typography/Typography";
import { Badge } from "@/core/components/shadcn/ui/badge/badge";
import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/shadcn/ui/table/table";
import { formatDateTime } from "@/core/utils/formatDate";
import { getGender } from "@/core/utils/getGender";
import { getStatusBadgeVariant } from "@/core/utils/getStatusBadgeVariant";
import { getStatusLabel } from "@/core/utils/getStatusLabel";
import { AlertCircle, Glasses, MapPin } from "lucide-react";
import { fakeBookings } from "../../../assets/mock/fakeBookings";
import ModalTabelBooking from "./modal/ModalTabelBooking";
function TabelBookingDashboard() {
  return (
    <div className="mt-5">
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12.5">ردیف</TableHead>
                <TableHead>نام هنرجو</TableHead>
                <TableHead>سن</TableHead>
                <TableHead>جنسیت</TableHead>
                <TableHead>استان / شهر</TableHead>
                <TableHead>تاریخ و ساعت</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="w-12.5"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fakeBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    رکوردی یافت نشد
                  </TableCell>
                </TableRow>
              ) : (
                fakeBookings.map((booking, index) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <TypographySpan>
                          {booking.student.fullName}
                        </TypographySpan>
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          {booking.student.hasGlasses && (
                            <TypographySpan className="flex items-center gap-1 text-amber-600">
                              <Glasses className="h-3 w-3" /> عینکی
                            </TypographySpan>
                          )}
                          {booking.student.medicalConditions && (
                            <TypographySpan className="flex items-center gap-1 text-red-500">
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
                        {booking.student.address} / {booking.student.city}
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
                    <TableCell>
                      <ModalTabelBooking booking={booking} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default TabelBookingDashboard;
