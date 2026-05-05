import {
  TypographyBig,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLarge,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from "@/core/components/custom/ui/typography/Typography";
function page() {
  return (
    <div className="container mx-auto py-10 space-y-10">
      <section className="text-center bg-primary/10 py-20 rounded-2xl">
        <TypographyBig>
          آموزشگاه <span className="text-primary">رانندگی</span>
        </TypographyBig>
        <TypographyLead className="mt-4">
          با بیش از ۱۵ سال تجربه درخشان
        </TypographyLead>
      </section>

      {/* TypographyH1 */}
      <section>
        <TypographyH1>درباره ما</TypographyH1>
        <TypographyP>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است.
        </TypographyP>
      </section>

      {/* TypographyH2 + TypographyP */}
      <section>
        <TypographyH2>تاریخچه آموزشگاه</TypographyH2>
        <TypographyP>
          آموزشگاه رانندگی دکترایکس از سال ۱۳۸۵ فعالیت خود را آغاز کرد و تاکنون
          بیش از ۱۰,۰۰۰ هنرجوی موفق را به جمع رانندگان قانونمند کشور اضافه کرده
          است.
        </TypographyP>
      </section>

      {/* TypographyH3 + TypographyList */}
      <section>
        <TypographyH3>خدمات ما</TypographyH3>
        <TypographyList
          listItems={[
            "آموزش رانندگی پایه یک و دو",
            "آموزش رانندگی با خودروهای اتومات و دنده‌ای",
            "آموزش رانندگی موتورسیکلت",
            "مشاوره و پیگیری اخذ گواهینامه",
          ]}
        />
      </section>

      {/* TypographyH4 + مزایا */}
      <section>
        <TypographyH4>چرا ما را انتخاب کنید؟</TypographyH4>
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <div className="p-4 border rounded-lg">
            <TypographyLarge>۱۵+ سال تجربه</TypographyLarge>
            <TypographySmall>با بالاترین آمار قبولی</TypographySmall>
          </div>
          <div className="p-4 border rounded-lg">
            <TypographyLarge>۱۰۰+ مربی مجرب</TypographyLarge>
            <TypographySmall>دارای گواهینامه رسمی</TypographySmall>
          </div>
          <div className="p-4 border rounded-lg">
            <TypographyLarge>۲۴/۷ پشتیبانی</TypographyLarge>
            <TypographySmall>همراه شما در تمام مراحل</TypographySmall>
          </div>
        </div>
      </section>

      {/* TypographyLead + TypographyMuted */}
      <section className="bg-muted p-6 rounded-xl">
        <TypographyLead>"کیفیت آموزش برای ما اولویت اول است"</TypographyLead>
        <TypographyMuted>- مدیر آموزشگاه</TypographyMuted>
      </section>

      {/* TypographySmall برای کپی رایت */}
      <footer className="border-t pt-6 text-center">
        <TypographySmall>
          © ۱۴۰۴ آموزشگاه رانندگی دکترایکس. تمامی حقوق محفوظ است.
        </TypographySmall>
      </footer>
    </div>
  );
}

export default page;
