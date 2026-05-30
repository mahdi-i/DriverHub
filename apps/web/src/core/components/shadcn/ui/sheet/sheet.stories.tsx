import { Button } from "@/core/components/shadcn/ui/button/button";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

const meta = {
  title: "shadcn/Sheet",
  component: Sheet,
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultRight: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">باز کردن در سمت راست</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>ویرایش پروفایل</SheetTitle>
          <SheetDescription>
            تغییرات خود را در اینجا وارد کنید و ذخیره کنید.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <p>این یک محتوای نمونه برای Sheet است.</p>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="نام کاربری"
          />
        </div>
        <SheetFooter>
          <Button type="submit">ذخیره تغییرات</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const SideTop: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">باز کردن از بالا</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>اعلان جدید</SheetTitle>
          <SheetDescription>
            این یک اعلان مهم است که از بالا نمایش داده می‌شود.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>محتوای اعلان در اینجا قرار می‌گیرد.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const SideBottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">باز کردن از پایین</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>منوی پایین</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Button variant="ghost">خانه</Button>
          <Button variant="ghost">پروفایل</Button>
          <Button variant="ghost">تنظیمات</Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};
