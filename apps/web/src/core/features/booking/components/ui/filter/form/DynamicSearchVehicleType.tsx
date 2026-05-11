import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/shadcn/ui/select/select";
function DynamicSearchVehicleType({ isBase1 }) {
  return (
    <>
      {isBase1 && (
        <div className="md:col-span-6 space-y-1">
          <TypographyP className="text-select">نوع وسیله نقلیه</TypographyP>
          <Select>
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="truck">کامیون</SelectItem>
              <SelectItem value="bus">اتوبوس</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
}

export default DynamicSearchVehicleType;
