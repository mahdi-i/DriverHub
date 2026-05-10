"use client";

import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/core/components/shadcn/ui/sheet/sheet";
import { DynamicSearchForm } from "@/core/features/booking/components/blocks/search/DynamicSearchForm";
import { redirect } from "next/navigation";
import { licenses } from "../../../../assets/mock/licenses";
function SheetMobileHeader() {
  return (
    <div className="bg-white border h-37.5 w-[90%]  flex flex-col absolute left-1/2 -translate-x-1/2 top-20 z-10 rounded-md">
      <div className="grid grid-cols-2 justify-center items-center h-full ">
        {licenses.map((item) => {
          const Icon = item.icon;
          const SheetContentComponent = ({ href, id }) => (
            <SheetContent
              side="bottom"
              className="h-[80vh] rounded-t-xl flex flex-col justify-between"
            >
              <SheetHeader className="text-right" dir="rtl">
                <SheetTitle className="flex items-center gap-2 mt-8">
                  <Icon size={24} />
                  {item.name}
                </SheetTitle>
                <SheetDescription>
                  <DynamicSearchForm id={id} />
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <Button
                  onClick={() => redirect(href)}
                  className="mt-4 w-full bg-primary "
                >
                  اقدام
                </Button>
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
              <SheetContentComponent href={`/${item.id}`} id={item.id} />
            </Sheet>
          );
        })}
      </div>
    </div>
  );
}

export default SheetMobileHeader;
