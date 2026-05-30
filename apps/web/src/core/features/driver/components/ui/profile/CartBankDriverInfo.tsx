"use client";
import {
  TypographyLarge,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";
import Logo from "@/core/features/main/components/ui/logo/Logo";
import { ProfileDriverTs } from "../../../assets/types/profileDriverTs";
function CartBankDriverInfo({ data }: { data: ProfileDriverTs }) {
  return (
    <Card className="bg-primary text-primary-foreground border-primary w-full md:w-[40%]">
      <CardHeader className="flex flex-row items-center justify-between w-full">
        <CardTitle className="text-lg text-primary-foreground">
          اطلاعات پرداخت
        </CardTitle>
        <Logo src="/img/logo/logo-mobile.svg" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <TypographySpan className="text-primary-foreground/80 text-sm">
              شماره حساب بانکی
            </TypographySpan>
            <div className="mt-1 flex items-center justify-between gap-3">
              <TypographyLarge>{data.bankAccountNumber}</TypographyLarge>
              <button
                className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                onClick={() =>
                  navigator.clipboard.writeText(data.bankAccountNumber)
                }
              >
                کپی
              </button>
            </div>
          </div>
          <TypographySpan className="font-medium">
            {data.fullName}
          </TypographySpan>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartBankDriverInfo;
