"use client";

import Modal from "@/core/components/custom/ui/modal/Modal";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { revalidateChache } from "@/core/lib/revalidate/Revalidate";
import { getDayOfWeekLabel } from "@/core/utils/getDayOfWeek";
import { useState } from "react";
import { toast } from "sonner";
function TrashModalDayOfWeek({ day, license, selectId }) {
  console.log(selectId, "selectId selectId");
  const [isModalOpen, setIsModalOpen] = useState(false);
  async function handleDelete() {
    const res = await fetch(`${BASE_URL}/schedule-driver/${selectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${license}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      return toast.error(data.errors || "مشکل پیش آمد");
    }
    toast.success(data.message || "با موفقیت زمان حذف شد");

    await revalidateChache("1");
    setIsModalOpen(false);
  }
  return (
    <Modal
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      title={`حذف روز ${getDayOfWeekLabel(day)} `}
      trigger={
        <Button
          variant="destructive"
          size="icon-sm"
          className="bg-white border border-destructive"
        >
          🗑️
        </Button>
      }
      hideDefaultFooter={true}
    >
      آیا مطمن هستید از حذف روز مورد نظر؟
      <div className="flex justify-around space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsModalOpen(false)}
          className="w-60"
        >
          انصراف
        </Button>
        <Button type="submit" className="w-60" onClick={() => handleDelete()}>
          حذف
        </Button>
      </div>
    </Modal>
  );
}

export default TrashModalDayOfWeek;
