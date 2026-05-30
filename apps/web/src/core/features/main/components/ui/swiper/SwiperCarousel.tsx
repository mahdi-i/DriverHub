"use client";

import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import {
  TypographyH3,
  TypographyLarge,
} from "@/core/components/custom/ui/typography/Typography";
import { Badge } from "@/core/components/shadcn/ui/badge/badge";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { getLicenseTypeLabel } from "@/core/utils/getLicenseTypeLabel";
import { GenderEnum } from "@driverhub/shared-types";
import { MoveLeft, MoveRight } from "lucide-react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SwiperCarousel({ items, className = "", title }) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <TypographyH3 className=" border-b text-gray-900 md:text-xl text-xl">
          {title}
        </TypographyH3>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => swiperRef.current?.slidePrev()}
            size="sm"
            variant="default"
            className=" flex items-center justify-center rounded-sm cursor-pointer"
          >
            <MoveRight size={15} />
          </Button>
          <Button
            onClick={() => swiperRef.current?.slideNext()}
            size="sm"
            variant="default"
            className=" flex items-center justify-center rounded-sm cursor-pointer"
          >
            <MoveLeft size={15} />
          </Button>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        className={`w-full ${className}`}
        breakpoints={{
          340: { slidesPerView: 1.2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="p-1">
            <div className="group bg-white rounded-md p-1 border border-gray-200/70  transition-all duration-300 h-full flex flex-col overflow-hidden">
              <div className="relative h-50 w-full overflow-hidden">
                <ImgNormalCustom
                  src={item.image}
                  alt={item.name}
                  width={1000}
                  height={100}
                  className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                />

                {item.hasBadge && (
                  <Badge className="absolute bg-secondary top-3 text-white right-3 text-xs font-extralight px-2 py-1 rounded-full shadow-sm">
                    ویژه
                  </Badge>
                )}

                <Badge className="absolute top-3 left-3 bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur border border-white/30">
                  {item.gender === GenderEnum.MALE ? "👨" : "👩"}
                </Badge>
              </div>

              <div className="p-4 flex flex-col gap-3 grow">
                <div className="flex flex-col gap-1">
                  <TypographyLarge className="text-gray-900 font-bold">
                    {item.name}
                  </TypographyLarge>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      📍 {item.city}، {item.province}
                    </span>

                    <span className="bg-blue-50 text-secondary px-2 py-1 rounded-full border border-blue-100 text-xs font-semibold">
                      {getLicenseTypeLabel(item.licenseType)}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-sm font-medium"
                  >
                    پروفایل
                  </Button>

                  <Button size="sm" className="rounded-sm font-medium ">
                    رزرو نوبت
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
