"use client";

import { EType } from "@/core/assets/@types/etype";
import { TypographySmall } from "@/core/components/custom/ui/typography/Typography";
import { useTimer } from "@/core/hooks/useTimer (3)";
import { useState } from "react";
import FormActions from "./FormActions";
import ModalHeader from "./ModalHeader";
import OtpInputField from "./OtpInputField";
import TimerStatus from "./TimerStatus";

interface SendOtpModalProps {
  setStep: (step: number) => void;
  setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SendOtpModal({
  setStep,
  setIsAuthModalOpen,
}: SendOtpModalProps) {
  const [otpCode, setOtpCode] = useState("");
  const { resetTimer, formattedTime, resindCode } = useTimer(120);

  const phoneNumber = "09124162342";

  function handleResendCode() {
    resetTimer();
    setOtpCode("");
  }

  function handleSubmit(e: EType) {
    e.preventDefault();
    if (otpCode.length !== 6) return;

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
