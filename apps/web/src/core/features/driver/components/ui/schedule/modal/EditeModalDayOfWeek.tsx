"use client";

import Modal from "@/core/components/custom/ui/modal/Modal";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { useState } from "react";
import { toast } from "sonner";
function EditeModalDayOfWeek({ day, schedule }) {
  const [editOpen, setEditOpen] = useState(false);
  function handleEdit() {
    toast.error(`آیتم ${schedule.day} برای ویرایش انتخاب شد.`);
  }
  return (
    <Modal
      open={editOpen}
      onOpenChange={setEditOpen}
      title="ویرایش روز"
      trigger={
        <Button
          variant="secondary"
          size="icon-sm"
          className="bg-white border border-secondary"
          onClick={() => handleEdit()}
        >
          ✏️
        </Button>
      }
    >
      123
    </Modal>
  );
}

export default EditeModalDayOfWeek;
