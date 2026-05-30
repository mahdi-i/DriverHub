"use client";

import { EType } from "@/core/assets/@types/etype";
import { useTimer } from "@/core/hooks/useTimer (3)";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { useState } from "react";
import { toast } from "sonner";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import FormActions from "./FormActions";
import ModalHeader from "./ModalHeader";
import OtpInputField from "./OtpInputField";
import TimerStatus from "./TimerStatus";
import { useRouter } from "next/navigation";

interface SendOtpModalProps {
  setStep: (step: number) => void;
  setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRole: string;
  phoneNumber: string;
}

export default function SendOtpModal({
  setStep,
  selectedRole,
  phoneNumber,
  setIsAuthModalOpen,
}: SendOtpModalProps) {
  const [otpCode, setOtpCode] = useState("");
  const { resetTimer, formattedTime, resindCode } = useTimer(120);

  // -----------------
    const router = useRouter();
  // ----------------

  function handleResendCode() {
    resetTimer();
    setOtpCode("");
  }

  async function handleSubmit(e: EType) {
    e.preventDefault();
    if (otpCode.length !== 6) return toast.error("کد 6 رقمی وارد کنید.");
    if (!phoneNumber) return toast.error("شماره موبایل وارد نشده");
    if (!selectedRole)
      return toast.error("نقش مورد نظر انتخاب نشده, لطفا دوباره تلاش کنید.");
    const formattedPhone = formatPhoneNumber(phoneNumber);

    if (selectedRole === "trainee") {
      try {
        const res = await fetch(`${BASE_URL}/auth/verify-otp/trainee`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            phone: formattedPhone,
            otp: otpCode,
          }),
        });
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          toast.success(data.message || "با موفقیت وارد شدید.");

          setIsAuthModalOpen(false);
          setStep(1);
          router.refresh();
        } else {
          toast.error(data.errors || "مشکل پیش آمد لطفا دوباره تلاش کنید");
        }
      } catch {
        return toast.error("مشکل پیش آمد لطفا دوباره تلاش کنید");
      }
    }
    if (selectedRole === "driver") {
      try {
        const res = await fetch(`${BASE_URL}/auth/verify-otp/teacher`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            phone: formattedPhone,
            otp: otpCode,
          }),
        });

        const data = await res.json();
        console.log(data);
        if (res.ok) {
          toast.success(data.message || "با موفقیت وارد شدید.");

          setIsAuthModalOpen(false);
          setStep(1);
        } else {
          toast.error(data.errors || "مشکل پیش آمد لطفا دوباره تلاش کنید");
        }
      } catch {
        return toast.error("مشکل پیش آمد لطفا دوباره تلاش کنید");
      }
    }
    setIsAuthModalOpen(false);
    setStep(1);
  }

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-4 p-5">
        <ModalHeader
          title="کد ورود"
          description="کد ورود کاربر"
          subDescription="کد ۶ رقمی را وارد کنید"
          phoneNumber={phoneNumber}
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <OtpInputField value={otpCode} onChange={setOtpCode} length={6} />

          <TimerStatus
            formattedTime={formattedTime}
            resindCode={resindCode}
            onResend={handleResendCode}
          />

          <FormActions
            isSubmitDisabled={otpCode.length !== 6}
            onBack={() => setStep(2)}
          />
        </form>
      </div>
    </div>
  );
}
