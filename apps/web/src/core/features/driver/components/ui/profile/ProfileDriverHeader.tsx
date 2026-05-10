"use client";

import Modal from "@/core/components/custom/ui/modal/Modal";
import { TypographyH4 } from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Input } from "@/core/components/shadcn/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/shadcn/ui/select/select";
import { Edit } from "lucide-react";
import { useState } from "react";

function ProfileDriverHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mb-6">
      <TypographyH4 className="text-2xl">پروفایل راننده</TypographyH4>

      <Modal
        title="ویرایش اطلاعات شخصی"
        description="لطفاً اطلاعات خود را با دقت وارد کنید."
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        trigger={
          <Button variant="secondary" className="gap-2">
            <Edit size={18} />
            ویرایش اطلاعات
          </Button>
        }
      >
        <div className="space-y-4 flex-wrap gap-4">
          <div className="space-y-2 w-full">
            <Input
              type="text"
              placeholder="نام خود را وارد کنید"
              label="نام و نام خانوادگی"
            />
          </div>
          <div className="space-y-2 w-full">
            <Input
              type="text"
              placeholder="شماره حساب وارد کنید"
              label="شماره حساب"
            />
          </div>
          <div className="w-full">
            <label className="text-sm font-medium mb-2 block">جنسیت</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="انتخاب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">آقا</SelectItem>
                <SelectItem value="female">خانم</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProfileDriverHeader;
