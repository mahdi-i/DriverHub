import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import {
  TypographyH3,
  TypographyLarge,
  TypographyMuted,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";
import { popularCities } from "@/core/features/main/assets/mock/popularCities";
import { provinces } from "@/core/features/main/assets/mock/provinces";
import Link from "next/link";

function MapSectionMainPage() {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <TypographyH3 className="text-primary-dark">فهرستگان</TypographyH3>
        <TypographySpan className="font-extralight text-muted-foreground">
          فهرست آموزشگاه رانندگی سراسر کشور و تفکیک استان ها
        </TypographySpan>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start mt-5 gap-4">
        <div className="w-full lg:w-auto">
          <ImgNormalCustom
            src={"/img/main/home/iran-map.png"}
            width={800}
            height={100}
            alt="iran map"
          />
        </div>

        <div className="flex-col items-center justify-center w-full text-center">
          <div className="flex md:flex-wrap flex-nowrap overflow-x-auto  gap-2 justify-center">
            {popularCities.map((p) => (
              <Link
                className="bg-[#eaeef78a] p-1 px-2 rounded-md font-normal text-secondary border text-sm cursor-pointer hover:bg-[#dde2f0] transition-colors whitespace-nowrap"
                key={p.id}
                href={`${p.name}`}
              >
                اموزشگاه رانندگی {p.name}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-5 text-right sm:bg-white  bg-secondary/5 p-2 space-y-2">
            {provinces.map((p) => (
              <Link
                className="font-medium text-text-light text-sm hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
                key={p.id}
                href={`${p.name}`}
              >
                {p.name}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <div className="border-blue-200 md:p-6 p-1 flex flex-col text-right ">
              <TypographyLarge className="text-secondary mb-2">
                صفحه ویژه آموزش‌دهندگان
              </TypographyLarge>
              <TypographyMuted className="text-sm font-light text-muted-foreground">
                چنانچه مایل به داشتن داشبورد و گذاشتن نوبت‌های خود هستید از طریق
                دکمه ورود یا ثبت‌نام مشخصات خود را وارد کنید.
              </TypographyMuted>
            </div>
            <div className=" md:p-6 p-1 flex flex-col text-right">
              <TypographyLarge className="text-secondary mb-2">
                صفحه ویژه یادگیرندگان
              </TypographyLarge>
              <TypographyMuted className="text-sm font-light text-muted-foreground">
                چنانچه مایل به داشتن داشبورد مخصوص رزرو نوبت و دیدن نوبت‌ها و
                مشخصات خود هستید از طریق دکمه ورود یا ثبت‌نام و کلیک روی نقش خود
                وارد شوید.
              </TypographyMuted>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapSectionMainPage;
