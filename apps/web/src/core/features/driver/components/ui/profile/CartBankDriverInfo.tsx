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
function CartBankDriverInfo() {
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
              <TypographyLarge>2044 - 2432 - 4545 - 5555</TypographyLarge>
              <button className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors">
                کپی
              </button>
            </div>
          </div>
          <TypographySpan>سوگند سنیور</TypographySpan>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartBankDriverInfo;
