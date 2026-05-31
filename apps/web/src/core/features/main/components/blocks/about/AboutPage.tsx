import FAQWrapper from "@/core/components/custom/ui/faq/FAQWrapper";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLarge,
  TypographyP,
} from "@/core/components/custom/ui/typography/Typography";
import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { CalendarCheck, CheckCircle2, Users } from "lucide-react";
import { faqDataAbout } from "../../../assets/mock/faqDataAbout";

function AboutPage() {
  return (
    <SectionLayout>
      <div className="text-center py-16 px-4 md:px-8 mx-auto">
        <TypographyH2 className="text-3xl md:text-5xl text-primary-foreground mb-6">
          درباره <span className="text-secondary">درایور هاب</span>
        </TypographyH2>
        <TypographyLarge className="text-slate-600 leading-relaxed">
          ما در درایور هاب با هدف ساده‌سازی فرآیند رزرو نوبت آموزشگاه‌های
          رانندگی فعالیت می‌کنیم. پلی میان آموزشگران حرفه‌ای و شاگردانی که به
          دنبال یادگیری اصولی رانندگی هستند.
        </TypographyLarge>
      </div>

      <div className="mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-secondary">
              <CalendarCheck size={24} />
            </div>
            <TypographyH4>رزرو آسان و سریع</TypographyH4>
            <TypographyP className="text-slate-600">
              بدون نیاز به تماس تلفنی یا مراجعه حضوری، نوبت خود را در کمترین
              زمان ممکن رزرو کنید.
            </TypographyP>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-success">
              <CheckCircle2 size={24} />
            </div>
            <TypographyH4>تأیید توسط آموزشگر</TypographyH4>
            <TypographyP className="text-slate-600">
              تمامی رزروها پس از بررسی و تأیید آموزشگر در پنل کاربری شما ثبت
              می‌شوند تا از تداخل زمانی جلوگیری شود.
            </TypographyP>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-destructive">
              <Users size={24} />
            </div>
            <TypographyH4>پنل اختصاصی آموزشگران</TypographyH4>
            <TypographyP className="text-slate-600">
              آموزشگران می‌توانند درخواست‌ها را مدیریت کنند، نوبت‌ها را مدیریت
              کنند و به راحتی با شاگردان خود ارتباط برقرار کنند.
            </TypographyP>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <TypographyH2>چرا درایور هاب را انتخاب کنید؟</TypographyH2>
          <TypographyP>
            ما معتقدیم که یادگیری رانندگی باید یک تجربه روان، بدون استرس و
            سازمان‌یافته باشد. درایور هاب با ارائه ابزارهای مدیریت نوبت هوشمند،
            هم برای شاگردان و هم برای آموزشگران زمان و انرژی صرفه‌جویی می‌کند.
            هدف ما ایجاد محیطی شفاف و قابل اعتماد برای شروع مسیر رانندگی شماست.
          </TypographyP>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className=" text-secondary mb-1">+۱۰۰</div>
              <div className="text-sm text-slate-500">آموزشگاه همکار</div>
            </div>
            <div>
              <div className=" text-secondary mb-1">+۵۰۰</div>
              <div className="text-sm text-slate-500">آموزشگر فعال</div>
            </div>
            <div>
              <div className=" text-secondary mb-1">+۵۰۰۰</div>
              <div className="text-sm text-slate-500">رزرو موفق</div>
            </div>
            <div>
              <div className=" text-secondary mb-1">۲۴/۷</div>
              <div className="text-sm text-slate-500">پشتیبانی آنلاین</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-16 px-4">
        <FAQWrapper title="سوالات متداول" faqs={faqDataAbout.faqs} />
      </div>

      <div className="bg-secondary py-12 px-4 text-center text-white rounded-md">
        <TypographyH2 className="text-2xl md:text-3xl mb-4">
          {" "}
          آماده‌اید یادگیری رانندگی را شروع کنید؟
        </TypographyH2>
        <TypographyP className="mb-6 text-blue-100">
          {" "}
          همین حالا ثبت‌نام کنید و اولین نوبت خود را رزرو نمایید.
        </TypographyP>
        <Button>ثبت‌ نام رایگان</Button>
      </div>
    </SectionLayout>
  );
}

export default AboutPage;
