"use client";
import Modal from "@/core/components/custom/ui/modal/Modal";
import { useState } from "react";
import SelectRoleModal from "../../ui/select-role/SelectRoleModal";
import SendOtpModal from "../../ui/send-otp/SendOtpModal";
import SendPhoneModal from "../../ui/send-phone/SendPhoneModal";

function ModalAuthHeader({ isAuthModalOpen, setIsAuthModalOpen }) {
  const [step, setStep] = useState(1);
  return (
    <>
      {isAuthModalOpen && (
        <Modal
          open={isAuthModalOpen}
          onOpenChange={setIsAuthModalOpen}
          hideDefaultFooter={true}
        >
          {step === 1 ? (
            <SendPhoneModal setStep={setStep} />
          ) : step === 2 ? (
            <SelectRoleModal setStep={setStep} />
          ) : (
            <SendOtpModal
              setStep={setStep}
              setIsAuthModalOpen={setIsAuthModalOpen}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default ModalAuthHeader;
