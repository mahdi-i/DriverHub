import { Button } from "@/core/components/shadcn/ui/button/button";
import { Input } from "@/core/components/shadcn/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/shadcn/ui/select/select";
import { Save } from "lucide-react";

function FormPostAndUpdateTraineeInfo({
  handleSubmit,
  InfoData,
  handleChange,
  handleGenderChange,
  isCreat,
}) {
  console.log(InfoData, "InfoInfoData");
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 grid grid-cols-2 md:grid-cols-2 gap-4"
    >
      <div className="space-y-2 ">
        <label className="text-sm font-medium">نام و نام خانوادگی</label>
        <Input
          name="fullName"
          type="text"
          placeholder="نام خود را وارد کنید"
          value={InfoData?.fullName || "-"}
          onChange={handleChange}
          required
        />
      </div>

      {isCreat ? (
        <div className="space-y-2 ">
          <label className="text-sm font-medium">کد ملی</label>
          <Input
            name="nationalCode"
            type="text"
            placeholder="کد ملی خود را وارد کنید"
            value={InfoData?.nationalCode || "-"}
            onChange={handleChange}
            max={11}
            required
          />
        </div>
      ) : (
        ""
      )}

      <div className="space-y-2 ">
        <label className="text-sm font-medium">سن</label>
        <Input
          name="age"
          type="number"
          placeholder="سن خود را وارد کنید"
          value={InfoData?.age || "-"}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2 ">
        <label className="text-sm font-medium">شرایط پزشکی / بیماری خاص</label>
        <Input
          name="medicalConditions"
          type="text"
          placeholder="مثلاً: دیابت، آسم و..."
          value={InfoData?.medicalConditions || "ندارم"}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2 ">
        <label className="text-sm font-medium">آدرس محل سکونت</label>
        <Input
          name="address"
          type="text"
          placeholder="آدرس کامل را وارد کنید"
          value={InfoData?.address || "-"}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2 ">
        <label className="text-sm font-medium">کد پستی</label>
        <Input
          name="postalCode"
          type="text"
          placeholder="کد پستی ۱۰ رقمی"
          value={InfoData?.postalCode || "-"}
          onChange={handleChange}
        />
      </div>
      <div className=" space-y-2">
        <label className="text-sm font-medium">جنسیت</label>
        <Select
          value={InfoData?.gender || "-"}
          onValueChange={handleGenderChange}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="انتخاب جنسیت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">آقا</SelectItem>
            <SelectItem value="female">خانم</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id="hasGlasses"
          name="hasGlasses"
          checked={InfoData?.hasGlasses || false}
          onChange={handleChange}
          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="hasGlasses" className="text-sm font-medium">
          دارای عینک
        </label>
      </div>

      <div className="flex pt-4">
        <Button type="submit" className="gap-2">
          <Save size={18} />
          در حال ذخیره...
        </Button>
      </div>
    </form>
  );
}

export default FormPostAndUpdateTraineeInfo;
