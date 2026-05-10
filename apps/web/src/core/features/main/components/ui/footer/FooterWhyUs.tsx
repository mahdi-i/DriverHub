import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import {
  TypographyLarge,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";

function FooterWhyUs() {
  return (
    <div className="md:flex  justify-between">
      <div className=" w-full p-4 flex items-center">
        <ImgNormalCustom
          src={"/img/footer/gaget.webp"}
          width={100}
          height={100}
          alt=""
        />
        <div>
          <TypographyLarge className="md:text-lg text-md">
            همراه هر آموزشی
          </TypographyLarge>
          <TypographySpan className="text-text-light md:text-md text-sm">
            ارائه تمامی خدمات رزرو نوبت آموزش رانندگی
          </TypographySpan>
        </div>
      </div>
      <div className="w-full p-4 flex items-center">
        <ImgNormalCustom
          src={"/img/footer/gaget1.webp"}
          width={100}
          height={100}
          alt=""
        />
        <div>
          <TypographyLarge className="md:text-lg text-md">
            همراه همه لحظات آموزش
          </TypographyLarge>
          <TypographySpan className="text-text-light md:text-md text-sm">
            پشتیبانی 24 ساعته همراه با شما در آموزش
          </TypographySpan>
        </div>
      </div>
      <div className=" w-full p-4 flex items-center">
        <ImgNormalCustom
          src={"/img/footer/gaget3.webp"}
          width={100}
          height={100}
          alt=""
        />
        <div>
          <TypographyLarge className="md:text-lg text-md">
            رتبه یک رزرو
          </TypographyLarge>
          <TypographySpan className="text-text-light md:text-md text-sm">
            معتبرترین عرضه‌کننده رزرو نوبت آموزشگاه رانندگی در ایران
          </TypographySpan>
        </div>
      </div>
    </div>
  );
}

export default FooterWhyUs;
