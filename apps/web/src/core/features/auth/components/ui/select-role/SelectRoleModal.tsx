"use client";
import { EType } from "@/core/assets/@types/etype";
import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { useState } from "react";
import { authdatafake } from "../../../assets/mock/authdatafake";
import FormActions from "./FormActions";
import ModalHeader from "./ModalHeader";
import RoleCard from "./RoleCard";

interface SelectRoleModal {
  setStep: (step: number) => void;
}

export default function SelectRoleModal({ setStep }: SelectRoleModal) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  function handleSubmit(e: EType) {
    e.preventDefault();
    if (!selectedRole) return;

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
