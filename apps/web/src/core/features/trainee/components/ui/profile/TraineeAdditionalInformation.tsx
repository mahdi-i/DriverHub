import { TypographySpan } from "@/core/components/custom/ui/typography/Typography";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";
import { getGender } from "@/core/utils/getGender";
import { Activity, Calendar, Glasses, Hash, MapPin, User } from "lucide-react";
import { ProfileTraineeTs } from "../../../assets/types/profileTrineeTs";
function TraineeAdditionalInformation({ data }: { data: ProfileTraineeTs }) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <Card className="border-none ">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            اطلاعات هویتی و تماس
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                نام و نام خانوادگی
              </label>
              <div className="flex items-center gap-2 p-3 bg-secondary-foreground rounded-sm border border-secondary-foreground">
                <User size={18} className="text-gray-400" />
                <TypographySpan className="font-medium text-black">
                  {data.fullName || "-"}
                </TypographySpan>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                سن
              </label>
              <div className="flex items-center gap-2 p-3 bg-secondary-foreground rounded-sm border border-secondary-foreground">
                <Calendar size={18} className="text-gray-400" />
                <TypographySpan className="font-medium text-black">
                  {data.age ? `${data.age} سال` : "-"}
                </TypographySpan>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                جنسیت
              </label>
              <div className="flex items-center gap-2 p-3 bg-secondary-foreground rounded-sm border border-secondary-foreground">
                <User size={18} className="text-gray-400" />
                <TypographySpan className="font-medium text-black">
                  {getGender(data.gender)}
                </TypographySpan>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                وضعیت عینک
              </label>
              <div className="flex items-center gap-2 p-3 bg-secondary-foreground rounded-sm border border-secondary-foreground">
                <Glasses
                  size={18}
                  className={
                    data.hasGlasses ? "text-orange-500" : "text-gray-400"
                  }
                />
                <TypographySpan
                  className={`font-medium ${data.hasGlasses ? "text-orange-600" : "text-black"}`}
                >
                  {data.hasGlasses ? "دارد" : "ندارد"}
                </TypographySpan>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-none ">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            اطلاعات تکمیلی و آدرس
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                آدرس محل سکونت
              </label>
              <div className="flex items-start gap-2 p-3 bg-secondary-foreground rounded-sm border border-secondary-foreground">
                <MapPin size={18} className="text-red-400 mt-1 shrink-0" />
                <TypographySpan className="font-medium text-black">
                  {data.address || "-"}
                </TypographySpan>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                کد پستی
              </label>
              <div className="flex items-center gap-2 p-3 bg-secondary-foreground rounded-sm border border-secondary-foreground">
                <Hash size={18} className="text-gray-400" />
                <TypographySpan className="font-medium text-black" dir="ltr">
                  {data.postalCode || "-"}
                </TypographySpan>
              </div>
            </div>
            <div className="space-y-2 md:col-span-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                شرایط پزشکی
              </label>
              <div className="flex items-start gap-2 p-3 bg-secondary-foreground rounded-sm border border-secondary-foreground">
                <Activity size={18} className="text-blue-400 mt-1 shrink-0" />
                <TypographySpan className="font-medium text-black">
                  {data.medicalConditions || "ندارم"}
                </TypographySpan>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TraineeAdditionalInformation;
