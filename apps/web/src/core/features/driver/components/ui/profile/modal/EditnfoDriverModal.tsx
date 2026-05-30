import Modal from "@/core/components/custom/ui/modal/Modal";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Input } from "@/core/components/shadcn/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/shadcn/ui/select/select";
import { DriverEditInfo } from "@/core/features/driver/assets/types/profileDriverTs";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { GenderEnum } from "@driverhub/shared-types";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function EditnfoDriverModal({
  data,
  token,
  driverId,
}: {
  data: DriverEditInfo;
  token: string;
  driverId: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [info, setInfo] = useState<DriverEditInfo>(data);

  function handleInfoChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  const handleSelectChange = (name: string, value: string) => {
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const payload = {
        fullName: info.fullName,
        gender: info.gender,
        age: info.age,
        carModel: info.carModel,
        carColor: info.carColor,
        experienceYears: info.experienceYears,
        hasGlasses: info.hasGlasses,
        medicalConditions: info.medicalConditions,
        address: info.address,
      };

      const res = await fetch(`${BASE_URL}/profile-driver/${driverId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.errors || "خطا در بروزرسانی اطلاعات");
      }

      toast.success(data.message || "اطلاعات با موفقیت بروزرسانی شد");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message || "مشکل در ارتباط با سرور");
    }
  }
  return (
    <Modal
      title="ویرایش اطلاعات پایه"
      description="اطلاعات هویتی و خودروی خود را ویرایش کنید."
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      trigger={
        <Button variant="secondary" className="gap-2">
          <Edit size={18} />
          ویرایش اطلاعات
        </Button>
      }
      hideDefaultFooter={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
          <div className="space-y-2">
            <Input
              name="fullName"
              label="نام و نام خانوادگی"
              value={info.fullName || ""}
              onChange={handleInfoChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">جنسیت</label>
            <Select
              value={info.gender || GenderEnum.MALE}
              onValueChange={(val) => handleSelectChange("gender", val)}
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

          <div className="space-y-2">
            <Input
              name="age"
              label="سن"
              type="number"
              value={info.age || 0}
              onChange={handleInfoChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              name="carModel"
              label="مدل خودرو"
              value={info.carModel || ""}
              onChange={handleInfoChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              name="carColor"
              label="رنگ خودرو"
              value={info.carColor || ""}
              onChange={handleInfoChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              name="experienceYears"
              label="سال‌های سابقه رانندگی"
              type="number"
              value={info.experienceYears || 0}
              onChange={handleInfoChange}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Input
              name="address"
              label="آدرس محل سکونت"
              value={info.address || ""}
              onChange={handleInfoChange}
              placeholder="آدرس دقیق خود را وارد کنید"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Input
              name="medicalConditions"
              label="مشکلات پزشکی خاص"
              value={info.medicalConditions || ""}
              onChange={handleInfoChange}
              placeholder="در صورت وجود بنویسید، در غیر این صورت خالی بگذارید"
            />
          </div>

          <div className="flex items-center gap-2 mt-2 md:col-span-2">
            <input
              type="checkbox"
              id="hasGlasses"
              name="hasGlasses"
              checked={info.hasGlasses || false}
              onChange={handleInfoChange}
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="hasGlasses" className="text-sm font-medium">
              دارای عینک
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit">ذخیره تغییرات</Button>
        </div>
      </form>
    </Modal>
  );
}

export default EditnfoDriverModal;
