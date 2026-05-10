import { Button } from "@/core/components/shadcn/ui/button/button";
import { Search } from "lucide-react";

function DynamicSearchSubmitBtn({
  isMotorcycle,
  isCar,
  isBase2,
  isBase1,
  isBase3,
  isHeavyMotor,
}) {
  return (
    <>
      {(isCar ||
        isMotorcycle ||
        isBase1 ||
        isBase2 ||
        isBase3 ||
        isHeavyMotor) && (
        <div className="md:w-[35%] justify-end md:flex hidden">
          <Button variant="default" className="w-full">
            <Search className="w-4 h-4 ml-2" />
            جستجو
          </Button>
        </div>
      )}
    </>
  );
}

export default DynamicSearchSubmitBtn;
