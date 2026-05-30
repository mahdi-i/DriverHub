import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/shadcn/ui/select/select";
import { GenderEnum, LicenseTypeEnum } from "@driverhub/shared-types";
function SelectorBookingFilter() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
      <div className="space-y-2 ">
        <label
          htmlFor="licenseType"
          className="text-sm font-medium text-muted-foreground"
        >
          نوع گواهینامه
        </label>
        <Select>
          <SelectTrigger id="licenseType" className="h-9">
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={LicenseTypeEnum.CAR}>سواری</SelectItem>
            <SelectItem value={LicenseTypeEnum.MOTORCYCLE}>
              موتورسیکلت
            </SelectItem>
            <SelectItem value={LicenseTypeEnum.BASE1}>سنگین</SelectItem>
            <SelectItem value={LicenseTypeEnum.BASE2}>نیمه سنگین</SelectItem>
            <SelectItem value={LicenseTypeEnum.BASE3}>سبک</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="gender"
          className="text-sm font-medium text-muted-foreground"
        >
          جنسیت
        </label>
        <Select>
          <SelectTrigger id="gender" className="h-9">
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={GenderEnum.FEMALE}>زن</SelectItem>
            <SelectItem value={GenderEnum.MALE}>مرد</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default SelectorBookingFilter;
