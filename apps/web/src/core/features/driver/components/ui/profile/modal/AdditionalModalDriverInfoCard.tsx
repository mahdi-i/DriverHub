"use client";
import AddressInput from "@/core/components/custom/ui/address-input/AddressInput";
import Modal from "@/core/components/custom/ui/modal/Modal";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Input } from "@/core/components/shadcn/ui/input/input";
import { ProfileDriverTs } from "@/core/features/driver/assets/types/profileDriverTs";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function AdditionalModalDriverInfoCard({
  data,
  token,
}: {
  data: ProfileDriverTs;
  token: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infoData, setInfoData] = useState(data);
  const [selectedProvince, setSelectedProvince] = useState(data.address || "");
  function handleInfoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setInfoData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  function handleProvinceSelect(province: string) {
    setSelectedProvince(province);
    setInfoData((prev) => ({
      ...prev,
      address: province,
    }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProvince) {
      return toast.error("لطفاً استان را انتخاب کنید");
    }
    try {
      const payload = {
        age: Number(infoData.age),
        nationalCode: infoData.nationalCode,
        hasGlasses: infoData.hasGlasses,
        medicalConditions: infoData.medicalConditions,
        address: selectedProvince,
        city: infoData.city,
      };

      const response = await fetch(
        `${BASE_URL}/profile-driver/complet-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        return toast.error(result.errors || "خطا در بروزرسانی اطلاعات تکمیلی");
      }

      toast.success(result.message || "اطلاعات تکمیلی با موفقیت ذخیره شد");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message || "مشکل در ذخیره اطلاعات تکمیلی");
    }
  }

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
      hideDefaultFooter={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 py-2">
          <div className="space-y-2">
            <Input
              name="age"
              label="سن"
              type="number"
              value={infoData.age}
              onChange={handleInfoChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              name="nationalCode"
              label="کد ملی"
              value={infoData.nationalCode}
              onChange={handleInfoChange}
              required
            />
          </div>
          <div className="space-y-2 ">
            <label className="text-sm font-medium leading-none">استان</label>
            <AddressInput
              address={selectedProvince}
              setAddress={handleProvinceSelect}
            />
          </div>
          <div className="space-y-2">
            <Input
              name="city"
              label="شهر"
              value={infoData.city}
              onChange={handleInfoChange}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Input
              name="medicalConditions"
              label="مشکلات پزشکی"
              value={infoData.medicalConditions}
              onChange={handleInfoChange}
              placeholder="در صورت وجود بنویسید، در غیر این صورت خالی بگذارید"
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="hasGlasses"
              name="hasGlasses"
              checked={infoData.hasGlasses}
              onChange={handleInfoChange}
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="hasGlasses" className="text-sm font-medium">
              دارای عینک
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit">ذخیره اطلاعات تکمیلی</Button>
        </div>
      </form>
    </Modal>
  );
}

export default AdditionalModalDriverInfoCard;
