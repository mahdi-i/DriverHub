"use client";

import Modal from "@/core/components/custom/ui/modal/Modal";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { useState } from "react";
import { toast } from "sonner";
function TrashModalDayOfWeek({ day }) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleDelete() {
    toast.error(`آیتم با شناسه ${day} برای حذف انتخاب شد.`);
  }
  return (
    <Modal
      open={deleteOpen}
      onOpenChange={setDeleteOpen}
      title="حذف روز"
      trigger={
        <Button
          variant="destructive"
          size="icon-sm"
          className="bg-white border border-destructive"
          onClick={() => handleDelete()}
        >
          🗑️
        </Button>
      }
    >
      123
    </Modal>
  );
}

export default TrashModalDayOfWeek;
