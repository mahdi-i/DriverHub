"use client";
import Modal from "@/core/components/custom/ui/modal/Modal";
import { TypographyH4 } from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { ProfileTraineeTs } from "@/core/features/trainee/assets/types/profileTrineeTs";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { GenderEnum } from "@driverhub/shared-types";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import FormPostAndUpdateTraineeInfo from "../FormPostAndUpdateTraineeInfo";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

function CreatAndUpdateModalTraineeInfo({
  isCreat = false,
  license,
  data,
}: {
  isCreat?: boolean;
  data: ProfileTraineeTs;
  license: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [InfoData, setInfoData] = useState<ProfileTraineeTs>(data);
  const [selectedProvince, setSelectedProvince] = useState(data.address || "");
  const route = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setInfoData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  function handleProvinceSelect(province: string) {
    setSelectedProvince(province);
    setInfoData((prev) => ({
      ...prev,
      address: province,
    }));
  }
  function handleGenderChange(value: GenderEnum) {
    setInfoData((prev) => ({ ...prev, gender: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProvince) {
      toast.error("لطفاً استان را انتخاب کنید");
      return;
    }

    try {
      const payload = {
        fullName: InfoData.fullName,
        nationalCode: InfoData?.nationalCode,
        age: Number(InfoData.age),
        gender: InfoData.gender,
        hasGlasses: InfoData.hasGlasses,
        medicalConditions: InfoData.medicalConditions,
        address: selectedProvince,
        postalCode: InfoData.postalCode,
      };

      const method = isCreat ? "POST" : "PUT";
      const response = await fetch(`${BASE_URL}/profile-trainee/profile`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${license}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        return toast.error(result.errors || "خطا در بروزرسانی اطلاعات");
      }

      toast.success(
        result.message ||
          (isCreat
            ? "اطلاعات با موفقیت ایجاد شد"
            : "اطلاعات با موفقیت بروزرسانی شد"),
      );
      route.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }
  return (
    <div className="flex justify-between items-center mb-6">
      <TypographyH4 className="text-2xl">پروفایل هنرجو</TypographyH4>
      <Modal
        title="ویرایش اطلاعات شخصی"
        description="لطفاً اطلاعات خود را با دقت وارد کنید."
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
        <FormPostAndUpdateTraineeInfo
          handleSubmit={handleSubmit}
          InfoData={InfoData}
          handleChange={handleChange}
          handleGenderChange={handleGenderChange}
          isCreat={isCreat}
          handleProvinceSelect={handleProvinceSelect}
          selectedProvince={selectedProvince}
        />
      </Modal>
    </div>
  );
}

export default CreatAndUpdateModalTraineeInfo;
