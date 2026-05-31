import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyLarge,
  TypographyP,
} from "@/core/components/custom/ui/typography/Typography";
import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";
import { Button } from "@/core/components/shadcn/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";
import { Input } from "@/core/components/shadcn/ui/input/input";
import { Textarea } from "@/core/components/shadcn/ui/Textarea/textarea";
import { Clock, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";

function ContactPage() {
  return (
    <SectionLayout>
      <div>
        <div className="text-center py-16 px-4 md:px-8 mx-auto">
          <TypographyH2 className="text-3xl md:text-5xl text-primary-foreground mb-6">
            تماس با <span className="text-secondary">درایور هاب</span>
          </TypographyH2>
          <TypographyLarge className="text-slate-600 leading-relaxed">
            سوالی دارید؟ پیشنهادی دارید؟ یا نیاز به پشتیبانی دارید؟ ما اینجا
            هستیم تا به شما کمک کنیم.
          </TypographyLarge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2  border-slate-200">
            <CardHeader className="border-b border-slate-100 bg-white rounded-t-lg">
              <CardTitle className="text-2xl text-primary-foreground flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-secondary" />
                ارسال پیام
              </CardTitle>
              <CardDescription>
                فرم زیر را پر کنید تا در اسرع وقت با شما تماس بگیریم.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name">نام و نام خانوادگی</label>
                    <Input
                      id="name"
                      placeholder="نام خود را وارد کنید"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email">ایمیل</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject">موضوع</label>
                  <Input
                    id="subject"
                    placeholder="موضوع پیام خود را بنویسید"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message">پیام</label>
                  <Textarea
                    id="message"
                    placeholder="پیام خود را اینجا بنویسید..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto bg-setext-secondary hover:bg-blue-700 text-white"
                >
                  <Send className="w-4 h-4 ml-2" />
                  ارسال پیام
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className=" border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-primary-foreground">
                  اطلاعات تماس
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary mt-1 shrink-0" />
                  <div>
                    <TypographyP>آدرس</TypographyP>
                    <TypographyP className="text-sm text-slate-600">
                      تهران، خیابان ولیعصر، برج آفتاب، طبقه ۵، واحد ۵۰۲
                    </TypographyP>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-secondary mt-1 shrink-0" />
                  <div>
                    <TypographyP>تلفن</TypographyP>
                    <TypographyP className="text-sm text-slate-600">
                      ۰۲۱-۱۲۳۴۵۶۷۸
                    </TypographyP>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-secondary mt-1 shrink-0" />
                  <div>
                    <TypographyP>ایمیل</TypographyP>
                    <TypographyP className="text-sm text-slate-600">
                      info@driverhub.ir
                    </TypographyP>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-secondary mt-1 shrink-0" />
                  <div>
                    <TypographyP>ساعات کاری</TypographyP>
                    <TypographyP className="text-sm text-slate-600">
                      شنبه تا چهارشنبه: ۹ صبح تا ۶ عصر
                      <br />
                      پنجشنبه: ۹ صبح تا ۱ بعدازظهر
                    </TypographyP>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className=" border-slate-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-primary-foreground">
                  شبکه‌های اجتماعی
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TypographyP className="text-sm text-slate-600 mb-4">
                  ما را در شبکه‌های اجتماعی دنبال کنید تا از آخرین اخبار و
                  تخفیف‌ها مطلع شوید.
                </TypographyP>
                <div className="flex gap-3">
                  <Button size="sm" className="flex-1">
                    Instagram
                  </Button>
                  <Button size="sm" className="flex-1">
                    Telegram
                  </Button>
                  <Button size="sm" className="flex-1">
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}

export default ContactPage;
