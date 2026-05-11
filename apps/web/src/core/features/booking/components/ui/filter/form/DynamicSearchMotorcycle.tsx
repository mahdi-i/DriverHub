import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/shadcn/ui/select/select";
function DynamicSearchMotorcycle({ isMotorcycle, isHeavyMotor }) {
  return (
    <>
      {(isMotorcycle || isHeavyMotor) && (
        <div className="md:col-span-6 space-y-1">
          <TypographyP className="text-select">نوع موتور</TypographyP>
          <Select>
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="نوع موتور" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">سبک (زیر 125)</SelectItem>
              <SelectItem value="heavy">سنگین (بالای 125)</SelectItem>
              <SelectItem value="none">ندارم</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
}

export default DynamicSearchMotorcycle;
