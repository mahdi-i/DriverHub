import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { Input } from "@/core/components/shadcn/ui/input/input";

function DynamicSearchPlace({
  isCar,
  isMotorcycle,
  isHeavyMotor,
  isBase2,
  isBase1,
  isBase3,
}) {
  return (
    <>
      {(isCar ||
        isMotorcycle ||
        isBase1 ||
        isBase2 ||
        isBase3 ||
        isHeavyMotor) && (
        <div className="md:w-full space-y-1">
          <TypographyP className="text-xs font-medium text-muted-foreground">
            منطقه آموزش
          </TypographyP>
          <Input
            type="text"
            placeholder="نام محله یا منطقه..."
            className="w-full "
          />
        </div>
      )}
    </>
  );
}

export default DynamicSearchPlace;
