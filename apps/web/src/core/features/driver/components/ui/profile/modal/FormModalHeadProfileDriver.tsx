import { Button } from "@/core/components/shadcn/ui/button/button";
import { Input } from "@/core/components/shadcn/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/shadcn/ui/select/select";
import { GenderEnum, LicenseTypeEnum } from "@driverhub/shared-types";

function FormModalHeadProfileDriver({
  handleSubmit,
  carFormData,
  handleCarChange,
  setCarFormData,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex-wrap gap-4">
      <div className="flex gap-3 items-center">
        <div className="space-y-2 w-full">
          <Input
            type="text"
            placeholder={carFormData.fullName}
            label="نام و نام خانوادگی"
            value={carFormData.fullName}
            onChange={handleCarChange}
            name="fullName"
            required
          />
        </div>
        <div className="space-y-2 w-full">
          <Input
            type="text"
            placeholder={carFormData.bankAccountNumber}
            label="شماره حساب"
            value={carFormData.bankAccountNumber}
            onChange={handleCarChange}
            name="bankAccountNumber"
            max={16}
            min={0}
            required
          />
        </div>
      </div>
      <div className="w-full">
        <label className="text-sm font-medium mb-2 block">جنسیت</label>
        <Select
          value={carFormData.gender}
          onValueChange={(val: GenderEnum) =>
            setCarFormData((prev) => ({ ...prev, gender: val }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="انتخاب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={GenderEnum.MALE}>آقا</SelectItem>
            <SelectItem value={GenderEnum.FEMALE}>خانم</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 py-2">
        <div className="space-y-2">
          <Input
            id="carModel"
            name="carModel"
            label="مدل خودرو"
            value={carFormData.carModel}
            onChange={handleCarChange}
            placeholder="مثال: پژو 206"
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            id="carColor"
            name="carColor"
            label="رنگ خودرو"
            value={carFormData.carColor}
            onChange={handleCarChange}
            placeholder="مثال: سفید"
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            id="licenseNumber"
            name="licenseNumber"
            label="شماره گواهینامه"
            value={carFormData.licenseNumber}
            onChange={handleCarChange}
            placeholder="1234567890"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium mb-2 block">
            نوع گواهینامه
          </label>
          <Select
            value={carFormData.licenseType}
            onValueChange={(val) =>
              setCarFormData((prev) => ({
                ...prev,
                licenseType: val as LicenseTypeEnum,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="انتخاب" />
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
        <div className="space-y-2 md:col-span-2">
          <Input
            id="experienceYears"
            name="experienceYears"
            label="سابقه رانندگی (سال)"
            type="number"
            min="0"
            value={carFormData.experienceYears}
            onChange={handleCarChange}
            placeholder="مثال: 5"
            required
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">ذخیره تغییرات</Button>
      </div>
    </form>
  );
}

export default FormModalHeadProfileDriver;
