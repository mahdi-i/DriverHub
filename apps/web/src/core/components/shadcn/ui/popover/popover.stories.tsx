import { Button } from "@/core/components/shadcn/ui/button/button";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";

const meta = {
  title: "shadcn/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">باز کردن پاپ‌آوَر</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>عنوان پاپ‌آوَر</PopoverTitle>
        </PopoverHeader>
        <PopoverDescription>
          این یک توضیحات نمونه برای پاپ‌آوَر است. شما می‌توانید هر محتوایی را در
          اینجا قرار دهید.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">تنظیمات سریع</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>تغییر رنگ</PopoverTitle>
        </PopoverHeader>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">پالت رنگی</h4>
            <p className="text-sm text-muted-foreground">
              رنگ مورد نظر خود را انتخاب کنید.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button className="h-8 w-8 rounded-full bg-red-500" />
            <button className="h-8 w-8 rounded-full bg-blue-500" />
            <button className="h-8 w-8 rounded-full bg-green-500" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
