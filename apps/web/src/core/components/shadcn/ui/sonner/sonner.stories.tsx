import { Toaster } from "./sonner";
import { toast } from "sonner";
import { Button } from "@/core/components/shadcn/ui/button/button";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "shadcn/Toaster",
  component: Toaster,
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() => toast.success("عملیات با موفقیت انجام شد!")}
        variant="default"
      >
        نمایش موفقیت (Success)
      </Button>
      <Button
        onClick={() => toast.info("یک پیام اطلاعاتی")}
        variant="secondary"
      >
        نمایش اطلاعات (Info)
      </Button>
      <Button
        onClick={() => toast.warning("توجه: این یک هشدار است")}
        variant="outline"
      >
        نمایش هشدار (Warning)
      </Button>
      <Button
        onClick={() => toast.error("خطایی رخ داده است!")}
        variant="destructive"
      >
        نمایش خطا (Error)
      </Button>
      <Button onClick={() => toast.loading("در حال پردازش...")} variant="ghost">
        نمایش بارگذاری (Loading)
      </Button>

      <Toaster />
    </div>
  ),
};

export const CustomPosition: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() =>
          toast.success("پیام در گوشه پایین چپ", {
            position: "bottom-left",
          })
        }
      >
        پایین چپ
      </Button>
      <Button
        onClick={() =>
          toast.success("پیام در گوشه پایین راست", {
            position: "bottom-right",
          })
        }
      >
        پایین راست
      </Button>

      <Toaster position="bottom-left" />
    </div>
  ),
};
