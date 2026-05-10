import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { Input } from "@/core/components/shadcn/ui/input/input";

function DynamicSearchCarModle({ isCar, isMotorcycle, isHeavyMotor }) {
  return (
    <>
      {isCar && (
        <div className="md:w-full space-y-1">
          <TypographyP className="text-xs font-medium text-muted-foreground">
            مدل خودرو
          </TypographyP>
          <Input
            type="text"
            placeholder="مثال: پژو 206، دنا..."
            className="w-full "
          />
        </div>
      )}
    </>
  );
}

export default DynamicSearchCarModle;
