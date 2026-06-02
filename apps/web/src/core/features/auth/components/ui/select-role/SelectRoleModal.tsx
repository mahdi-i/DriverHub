"use client";
import { EType } from "@/core/assets/@types/etype";
import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { toast } from "sonner";
import { authdatafake } from "../../../assets/mock/authdatafake";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import FormActions from "./FormActions";
import ModalHeader from "./ModalHeader";
import RoleCard from "./RoleCard";

interface SelectRoleModal {
  setStep: (step: number) => void;
  selectedRole: string;
  setSelectedRole: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
}

export default function SelectRoleModal({
  setStep,
  phoneNumber,
  selectedRole,
  setSelectedRole,
}: SelectRoleModal) {
  console.log(process.env.BACKEND_BASIC_LINK);

  async function handleSubmit(e: EType) {
    e.preventDefault();

    if (!phoneNumber) {
      return toast.error("شماره موبایل وارد نشده");
    }

    if (!selectedRole) {
      return toast.error("نقش مورد نظر انتخاب نشده, لطفا دوباره تلاش کنید.");
    }

    const formattedPhone = formatPhoneNumber(phoneNumber);
    console.log(formattedPhone, "befor otp");
    if (!phoneNumber) return toast.error("شماره موبایل وارد نشده");
    if (!selectedRole)
      return toast.error("نقش مورد نظر انتخاب نشده, لطفا دوباره تلاش کنید.");
    const sendOp = await fetch(`${BASE_URL}/auth/request-otp`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: formattedPhone,
      }),
    });

    const data = await sendOp.json();
    if (!sendOp.ok) {
      return toast.error(data.errors || "خطا در ارسال کد");
    }

    console.log("OTP Response:", data);
    setStep(3);
  }

  return (
    <div className="flex flex-col max-h-[90vh] overflow-y-auto">
      <div className="flex flex-col gap-4 p-5">
        <ModalHeader
          title="نقش خود را انتخاب کنید"
          subDescription="لطفاً نقش خود را در سامانه مشخص کنید"
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {authdatafake.map((role) => (
            <RoleCard
              key={role.id}
              title={role.title}
              description={role.description}
              icon={role.icon}
              isSelected={selectedRole === role.id}
              onClick={() => setSelectedRole(role.id)}
            />
          ))}
          <FormActions
            isSubmitDisabled={!selectedRole}
            onBack={() => setStep(1)}
          />
        </form>
        <div className="mt-1 text-center">
          <TypographyP className="text-xs text-muted-foreground">
            با ثبت نام در درایور هاب قوانین رو میپذیرم.
          </TypographyP>
        </div>
      </div>
    </div>
  );
}
