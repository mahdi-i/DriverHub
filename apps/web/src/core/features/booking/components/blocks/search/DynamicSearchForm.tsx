"use client";

import { usePathname } from "next/navigation";

import { useState } from "react";
import CalendarBooking from "../../ui/filter/calendar/CalendarBooking";
import DynamicSearchSubmitBtn from "../../ui/filter/DynamicSearchSubmitBtn";
import DynamicSearchCarModle from "../../ui/filter/form/DynamicSearchCarModle";
import DynamicSearchGender from "../../ui/filter/form/DynamicSearchGender";
import DynamicSearchMotorcycle from "../../ui/filter/form/DynamicSearchMotorcycle";
import DynamicSearchPlace from "../../ui/filter/form/DynamicSearchPlace";
import DynamicSearchVehicleType from "../../ui/filter/form/DynamicSearchVehicleType";

export function DynamicSearchForm() {
  const pathname = usePathname();
  const [valueCalendar, setValueCalendar] = useState<Date | null>(null);

  const isCar = pathname.includes("/");
  const isMotorcycle = pathname.includes("/motorcycle");
  const isHeavyMotor = pathname.includes("/heavy-motorcycle");
  const isBase1 = pathname.includes("/car-base1");
  const isBase2 = pathname.includes("/car-base2");
  const isBase3 = pathname.includes("/car-base3");

  return (
    <div>
      <div className=" pb-4 px-4 space-y-4">
        <div className="flex gap-3 items-end">
          <CalendarBooking
            valueCalendar={valueCalendar}
            setValueCalendar={setValueCalendar}
          />
          <DynamicSearchGender />
          <DynamicSearchPlace
            isCar={isCar}
            isHeavyMotor={isHeavyMotor}
            isMotorcycle={isMotorcycle}
          />
          <DynamicSearchCarModle
            isCar={isCar}
            isHeavyMotor={isHeavyMotor}
            isMotorcycle={isMotorcycle}
          />
          <DynamicSearchMotorcycle
            isHeavyMotor={isHeavyMotor}
            isMotorcycle={isMotorcycle}
          />
          <DynamicSearchVehicleType isBase1={isBase1} />

          <DynamicSearchSubmitBtn
            isBase1={isBase1}
            isBase2={isBase2}
            isBase3={isBase3}
            isCar={isCar}
            isHeavyMotor={isHeavyMotor}
            isMotorcycle={isMotorcycle}
          />
        </div>
      </div>
    </div>
  );
}
