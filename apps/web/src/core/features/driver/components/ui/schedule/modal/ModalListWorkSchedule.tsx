"use client";
import Modal from "@/core/components/custom/ui/modal/Modal";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { useState } from "react";
function ModalListWorkSchedule() {
  const [open, setopen] = useState(false);

  return (
    <Modal
      open={open}
      onOpenChange={setopen}
      title="مشاهده لیست"
      trigger={
        <Button className="mt-5 ms-5 md:w-40 w-full" variant="secondary">
          مشاهده لیست
        </Button>
      }
    >
      123
    </Modal>
  );
}

export default ModalListWorkSchedule;
