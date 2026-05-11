import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/shadcn/ui/select/select";
function DynamicSearchGender() {
  return (
    <div className="md:w-full space-y-1">
      <TypographyP className="text-select">جنسیت</TypographyP>
      <Select>
        <SelectTrigger className="w-full ">
          <SelectValue placeholder="انتخاب" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">آقا</SelectItem>
          <SelectItem value="female">خانم</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default DynamicSearchGender;
