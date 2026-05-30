import { Button } from "@/core/components/shadcn/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/components/shadcn/ui/dialog/dialog";
import { Input } from "@/core/components/shadcn/ui/input/input";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "shadcn/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "باز یا بسته بودن مودال",
    },
    defaultOpen: {
      control: "boolean",
      description: "باز شدن پیش‌فرض",
    },
    onOpenChange: {
      action: "open changed",
      description: "تابع تغییر وضعیت",
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">ویرایش پروفایل</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>ویرایش اطلاعات</DialogTitle>
          <DialogDescription>
            تغییرات خود را در اینجا وارد کنید و ذخیره کنید.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>این یک محتوای نمونه است.</p>
        </div>
        <DialogFooter>
          <Button type="submit">ذخیره تغییرات</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>افزودن محصول</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>محصول جدید</DialogTitle>
          <DialogDescription>
            اطلاعات محصول جدید را وارد کنید.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="نام محصول"
          />
          <Input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="قیمت"
          />
        </div>
        <DialogFooter>
          <Button type="submit">افزودن</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
