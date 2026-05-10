"use client";
import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/core/components/shadcn/ui/sheet/sheet";
import Link from "next/link";
import { licenses } from "../../../../assets/mock/licenses";
import Logo from "../../logo/Logo";
function MobileHeader() {
  return (
    <>
      <div className="h-37.5 bg-primary flex justify-center  relative ">
        <div className="mt-8">
          <Logo src="/img/logo/logo-mobile.svg" width={120} />
        </div>
      </div>

      <div className="bg-white border h-37.5 w-[90%]  flex flex-col absolute left-1/2 -translate-x-1/2 top-20 z-10 rounded-md">
        <div className="grid grid-cols-2 justify-center items-center h-full ">
          {licenses.map((item) => {
            const Icon = item.icon;
            const SheetContentComponent = ({ href }) => (
              <SheetContent side="bottom" className="h-[70vh] rounded-t-xl">
                <SheetHeader className="text-right" dir="rtl">
                  <SheetTitle className="flex items-center gap-2">
                    <Icon size={24} />
                    {item.name}
                  </SheetTitle>
                  <SheetDescription>
                    توضیحات مربوط به {item.name} در اینجا قرار می‌گیرد.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">
                    جزئیات بیشتر درباره لایسنس {item.id} ...
                  </p>
                  <Link
                    href={href}
                    onClick={() => console.log("Action for", item.id)}
                    className="mt-4 w-full bg-primary text-white py-2 rounded-md"
                  >
                    اقدام
                  </Link>
                </div>
              </SheetContent>
            );
            return (
              <Sheet key={item.id}>
                <SheetTrigger asChild>
                  <div
                    key={item.href}
                    className={`
                  relative flex items-center justify-center w-full h-full  border-[0.5px] border-gray-200 gap-1
                  `}
                  >
                    <div className={` items-center `}>
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <TypographyP className="text-sm font-medium text-center leading-tight">
                      {item.name}
                    </TypographyP>
                  </div>
                </SheetTrigger>
                <SheetContentComponent href={`/${item.id}`} />
              </Sheet>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MobileHeader;
