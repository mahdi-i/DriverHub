import AddressInput from "@/core/components/custom/ui/address-input/AddressInput";
import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { useState } from "react";

function DynamicSearchPlace({
  isCar,
  isMotorcycle,
  isHeavyMotor,
  isBase2,
  isBase1,
  isBase3,
}) {
  const [province, setProvince] = useState("");
  return (
    <>
      {(isCar ||
        isMotorcycle ||
        isBase1 ||
        isBase2 ||
        isBase3 ||
        isHeavyMotor) && (
        <div className="md:w-full space-y-1">
          <TypographyP className="text-select">منطقه آموزش</TypographyP>
          <AddressInput address={province} setAddress={setProvince} />
        </div>
      )}
    </>
  );
}

export default DynamicSearchPlace;
