import {
  TypographyLarge,
  TypographySmall,
} from "@/core/components/custom/ui/typography/Typography";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/core/components/shadcn/ui/card/card";
import { quickAccessItemsTrainee } from "@/core/features/driver/assets/mock/quickAccessItems";
import Link from "next/link";

function AccessDashboardItemTrainee() {
  return (
    <Card>
      <CardHeader>
        <TypographyLarge>دسترسی سریع</TypographyLarge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {quickAccessItemsTrainee.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className="flex flex-col  items-center justify-center py-2 rounded-sm border border-gray-100 dark:border-gray-800 "
              >
                <div
                  className={`p-3 rounded-full  mb-3 ${item.color} group-hover:scale-110 transition-transform`}
                >
                  <Icon />
                </div>
                <TypographySmall>{item.label}</TypographySmall>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default AccessDashboardItemTrainee;
