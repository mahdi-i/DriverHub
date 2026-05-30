import Modal from "@/core/components/custom/ui/modal/Modal";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { ProfileDriverTs } from "@/core/features/driver/assets/types/profileDriverTs";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import FormModalHeadProfileDriver from "./FormModalHeadProfileDriver";

function ModalProfileInfoDriver({
  data,
  token,
  isOpen,
}: {
  data: ProfileDriverTs;
  token: string;
  isOpen?: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen ? isOpen : false);
  const [carFormData, setCarFormData] = useState(data);
  const router = useRouter();
  function handleCarChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setCarFormData((prev) => ({
      ...prev,
      [name]: name === "experienceYears" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const payload = {
        fullName: carFormData.fullName,
        gender: carFormData.gender,
        licenseNumber: carFormData.licenseNumber,
        experienceYears: carFormData.experienceYears,
        carModel: carFormData.carModel,
        carColor: carFormData.carColor,
        bankAccountNumber: carFormData.bankAccountNumber,
        licenseType: carFormData.licenseType,
      };
      const response = await fetch(`${BASE_URL}/profile-driver/introduction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        return toast.error(result.errors || "خطا در بروزرسانی اطلاعات");
      }

      toast.success(result.message || "اطلاعات با موفقیت ذخیره شد");
      setIsModalOpen(false);
      router.refresh();
    } catch (err) {
      console.log(err);
      isOpen ? setIsModalOpen(true) : setIsModalOpen(false);
      toast.error("مشکل پیش آمد");
    }
  }
  return (
    <Modal
      title="ویرایش اطلاعات شخصی"
      description="لطفاً اطلاعات خود را با دقت وارد کنید."
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      hideDefaultFooter={true}
      trigger={
        isOpen ? (
          ""
        ) : (
          <Button variant="secondary" className="gap-2">
            <Edit size={18} />
            ویرایش اطلاعات
          </Button>
        )
      }
    >
      <FormModalHeadProfileDriver
        handleSubmit={handleSubmit}
        carFormData={carFormData}
        handleCarChange={handleCarChange}
        setCarFormData={setCarFormData}
      />
    </Modal>
  );
}

export default ModalProfileInfoDriver;
