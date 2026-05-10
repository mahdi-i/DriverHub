"use client";

import Modal from "@/core/components/custom/ui/modal/Modal";
import { Input } from "@/core/components/shadcn/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/shadcn/ui/select/select";
import { carData } from "@/core/features/driver/assets/mock/carData";
import { LicenseTypeEnum } from "@driverhub/shared-types";
import { Edit } from "lucide-react";
import { useState } from "react";

function CarInfoModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carFormData, setCarFormData] = useState(carData);

  const handleCarChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCarFormData((prev) => ({
      ...prev,
      [name]: name === "experienceYears" ? Number(value) : value,
    }));
  };
  return (
    <Modal
      title="ویرایش اطلاعات ماشین"
      description="لطفاً اطلاعات خود را با دقت وارد کنید."
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      trigger={
        <Edit
          size={18}
          className="text-secondary cursor-pointer hover:text-primary"
        />
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 py-2">
        <div className="space-y-2">
          <Input
            id="carModel"
            name="carModel"
            label="مدل خودرو"
            value={carFormData.carModel}
            onChange={handleCarChange}
            placeholder="مثال: پژو 206"
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
          />
        </div>
      </div>
    </Modal>
  );
}

export default CarInfoModal;
