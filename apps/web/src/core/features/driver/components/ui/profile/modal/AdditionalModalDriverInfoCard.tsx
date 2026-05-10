import Modal from "@/core/components/custom/ui/modal/Modal";
import { Input } from "@/core/components/shadcn/ui/input/input";
import { additionalinitialInfo } from "@/core/features/driver/assets/mock/carData";
import { Edit } from "lucide-react";
import { useState } from "react";
function AdditionalModalDriverInfoCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infoData, setInfoData] = useState(additionalinitialInfo);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setInfoData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return (
    <Modal
      title="ویرایش اطلاعات تکمیلی"
      description="اطلاعات پزشکی و آدرس خود را ویرایش کنید."
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
            name="age"
            label="سن"
            type="number"
            value={infoData.age}
            onChange={handleInfoChange}
          />
        </div>
        <div className="space-y-2">
          <Input
            name="nationalCode"
            label="کد ملی"
            value={infoData.nationalCode}
            onChange={handleInfoChange}
          />
        </div>
        <div className="space-y-2">
          <Input
            name="province"
            label="استان"
            value={infoData.province}
            onChange={handleInfoChange}
          />
        </div>
        <div className="space-y-2">
          <Input
            name="city"
            label="شهر"
            value={infoData.city}
            onChange={handleInfoChange}
          />
        </div>
        <div className="space-y-2">
          <Input
            name="medicalConditions"
            label="مشکلات پزشکی"
            value={infoData.medicalConditions}
            onChange={handleInfoChange}
          />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="hasGlasses"
            name="hasGlasses"
            checked={infoData.hasGlasses}
            onChange={handleInfoChange}
            className="w-4 h-4"
          />
          <label htmlFor="hasGlasses">دارای عینک</label>
        </div>
      </div>
    </Modal>
  );
}

export default AdditionalModalDriverInfoCard;
