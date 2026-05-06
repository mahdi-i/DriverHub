import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { Input } from "@/core/components/shadcn/ui/input/input";

function DynamicSearchPlace({ isCar, isMotorcycle, isHeavyMotor }) {
  return (
    <>
      {(isCar || isMotorcycle || isHeavyMotor) && (
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
