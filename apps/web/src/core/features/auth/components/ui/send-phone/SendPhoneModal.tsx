"use client";

import { EType } from "@/core/assets/@types/etype";
import {
  TypographyH3,
  TypographyP,
  TypographySmall,
} from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Input } from "@/core/components/shadcn/ui/input/input";
import { toast } from "sonner";

export default function SendPhoneModal({
  setStep,
  phoneNumber,
  setPhoneNumber,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}) {
  function handleSubmit(e: EType) {
    e.preventDefault();
    if (!phoneNumber) return toast.error("لطفا شماره موبایل خود را وارد کنید.");
    if (phoneNumber.length !== 11) {
      return toast.error("شماره تلفن باید 11 رقم باشد.");
    }
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return toast.error("شماره تلفن نامعتبر است.");
    }

    setStep(2);
  }

  return (
    <div className="flex flex-col gap-6 p-3">
      <div className="text-center">
        <TypographyH3 className="mb-2">ورود / ثبت نام</TypographyH3>
        <TypographySmall>
          برای ورود یا ثبت نام شماره موبایل خود را وارد کنید
        </TypographySmall>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="tel"
          placeholder="09123456789"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          maxLength={11}
          autoFocus
        />

        <Button type="submit" disabled={!phoneNumber} className="gap-2">
          ادامه
        </Button>
      </form>

      <div className="mt-4 text-center">
        <TypographyP className="text-xs text-muted-foreground">
          با ورود و ثبت نام در درایورهاب, شرایط و قوانین را می‌ پذیرید
        </TypographyP>
      </div>
    </div>
  );
}
