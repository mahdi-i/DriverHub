import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import {
  TypographyH4,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";

function FooterWhyUs() {
  return (
    <div className="flex justify-between">
      <div className=" w-full p-4 flex items-center">
        <ImgNormalCustom
          src={"/img/footer/gaget.webp"}
          width={100}
          height={100}
          alt=""
        />
        <div>
          <TypographyH4>همراه هر آموزشی</TypographyH4>
          <TypographySpan className="text-text-light">
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
          <TypographyH4>همراه همه لحظات آموزش</TypographyH4>
          <TypographySpan className="text-text-light">
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
          <TypographyH4>رتبه یک رزرو</TypographyH4>
          <TypographySpan className="text-text-light">
            معتبرترین عرضه‌کننده رزرو نوبت آموزشگاه رانندگی در ایران
          </TypographySpan>
        </div>
      </div>
    </div>
  );
}

export default FooterWhyUs;
