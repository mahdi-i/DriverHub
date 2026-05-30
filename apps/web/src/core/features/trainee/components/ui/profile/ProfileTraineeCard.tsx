import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import {
  TypographyH3,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";
import { Badge } from "@/core/components/shadcn/ui/badge/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";
import { formatDate } from "@/core/utils/formatDate";
import {
  Activity,
  Briefcase,
  CheckCircle2,
  Hash,
  Phone,
  XCircle,
} from "lucide-react";
import { ProfileTraineeTs } from "../../../assets/types/profileTrineeTs";
function ProfileTraineeCard({ data }: { data: ProfileTraineeTs }) {
  return (
    <div className="lg:col-span-1 space-y-6">
      <Card className="overflow-hidden border-none shadow-sm bg-linear-to-br from-white to-gray-50 py-0">
        <div className="h-14 bg-linear-to-r from-secondary to-primary"></div>
        <CardContent className="p-0">
          <div className="relative px-6 pb-6">
            <div className="absolute -top-12 left-6">
              <ImgNormalCustom
                src={"/img/dashboard/driver/profile/avatar-4c776756.svg"}
                width={70}
                height={70}
                alt="profile"
                className="rounded-full"
              />
            </div>
            <div className="pt-14">
              <div className="flex justify-between items-start">
                <div>
                  <TypographyH3 className="text-2xl  text-black">
                    {data.fullName || "-"}
                  </TypographyH3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Briefcase size={14} />
                    هنرجو
                  </p>
                </div>
                <Badge
                  variant={data.isProfileComplete ? "default" : "destructive"}
                  className="gap-1"
                >
                  {data.isProfileComplete ? (
                    <>
                      <CheckCircle2 size={12} />
                      کامل
                    </>
                  ) : (
                    <>
                      <XCircle size={12} />
                      ناقص
                    </>
                  )}
                </Badge>
              </div>
              <div className="space-y-3 text-sm text-gray-600 mt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-full texm-sefrom-secondary">
                    <Phone size={16} />
                  </div>
                  <TypographySpan className="font-medium" dir="ltr">
                    {data.user?.phone || "-"}
                  </TypographySpan>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-full text-success">
                    <Activity size={16} />
                  </div>
                  <TypographySpan className="font-medium">
                    وضعیت:{" "}
                    <TypographySpan
                      className={
                        data.user?.isActive
                          ? "text-success"
                          : "text-destructive"
                      }
                    >
                      {data.user?.isActive ? "فعال" : "غیرفعال"}
                    </TypographySpan>
                  </TypographySpan>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-full">
                    <Hash size={16} />
                  </div>
                  <TypographySpan className="font-medium" dir="ltr">
                    {data.nationalCode || "-"}
                  </TypographySpan>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-none  bg-secondary-foreground">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            تاریخ ثبت ‌نام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm" dir="ltr">
            {formatDate(data.user?.createdAt)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileTraineeCard;
