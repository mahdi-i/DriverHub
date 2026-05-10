"use client";

import { usePathname } from "next/navigation";

import { useIsMobile } from "@/core/hooks/useIsMobile";
import { useMemo, useState } from "react";
import CalendarBooking from "../../ui/filter/calendar/CalendarBooking";
import DynamicSearchSubmitBtn from "../../ui/filter/DynamicSearchSubmitBtn";
import DynamicSearchCarModle from "../../ui/filter/form/DynamicSearchCarModle";
import DynamicSearchGender from "../../ui/filter/form/DynamicSearchGender";
import DynamicSearchMotorcycle from "../../ui/filter/form/DynamicSearchMotorcycle";
import DynamicSearchPlace from "../../ui/filter/form/DynamicSearchPlace";
import DynamicSearchVehicleType from "../../ui/filter/form/DynamicSearchVehicleType";

export function DynamicSearchForm({ id }: { id?: string }) {
  const pathname = usePathname();
  const [valueCalendar, setValueCalendar] = useState<Date | null>(null);
  const isMobile = useIsMobile();

  const routeInfo = useMemo(() => {
    console.log(id, "id");
    if (id !== undefined) {
      return {
        isCar: id === "",
        isMotorcycle: id === "motorcycle",
        isHeavyMotor: id === "heavy-motorcycle",
        isBase1: id === "car-base1",
        isBase2: id === "car-base2",
        isBase3: id === "car-base3",
      };
    }

    return {
      isCar: pathname === "/" || pathname === "",
      isMotorcycle: pathname.includes("/motorcycle"),
      isHeavyMotor: pathname.includes("/heavy-motorcycle"),
      isBase1: pathname.includes("/car-base1"),
      isBase2: pathname.includes("/car-base2"),
      isBase3: pathname.includes("/car-base3"),
    };
  }, [id, pathname]);
  return (
    <div>
      <div className=" pb-4 px-4 space-y-4 mt-2">
        <div
          className={
            isMobile ? "space-y-4" : "space-y-4 gap-3 items-center flex"
          }
        >
          <CalendarBooking
            valueCalendar={valueCalendar}
            setValueCalendar={setValueCalendar}
          />
          <DynamicSearchGender />
          <DynamicSearchPlace
            isBase1={routeInfo.isBase1}
            isBase2={routeInfo.isBase2}
            isBase3={routeInfo.isBase3}
            isCar={routeInfo.isCar}
            isHeavyMotor={routeInfo.isHeavyMotor}
            isMotorcycle={routeInfo.isMotorcycle}
          />
          <DynamicSearchCarModle
            isCar={routeInfo.isCar}
            isHeavyMotor={routeInfo.isHeavyMotor}
            isMotorcycle={routeInfo.isMotorcycle}
          />
          <DynamicSearchMotorcycle
            isHeavyMotor={routeInfo.isHeavyMotor}
            isMotorcycle={routeInfo.isMotorcycle}
          />
          <DynamicSearchVehicleType isBase1={routeInfo.isBase1} />

          <DynamicSearchSubmitBtn
            isBase1={routeInfo.isBase1}
            isBase2={routeInfo.isBase2}
            isBase3={routeInfo.isBase3}
            isCar={routeInfo.isCar}
            isHeavyMotor={routeInfo.isHeavyMotor}
            isMotorcycle={routeInfo.isMotorcycle}
          />
        </div>
      </div>
    </div>
  );
}
