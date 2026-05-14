import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";
import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";

function page() {
  return (
    <SectionLayout>
      <div className="flex gap-4 items-start">
        <aside className="w-[30%]">
          <Card className="sticky top-24">
            <CardContent className="space-y-4 p-4">
              <div className="font-semibold">مرتب‌ سازی</div>
              <div>انتخاب نوع گواهینامه</div>
            </CardContent>
          </Card>
        </aside>

        <div className="w-full space-y-4">
          <Card>
            <CardContent className="p-4">1</CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div>Pagination</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionLayout>
  );
}

export default page;
