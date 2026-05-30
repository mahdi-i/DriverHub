import { Button } from "@/core/components/shadcn/ui/button/button";
import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const meta = {
  title: "shadcn/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "باز یا بسته بودن منو",
    },
    defaultOpen: {
      control: "boolean",
      description: "باز شدن پیش‌فرض",
    },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">منو</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>منوی کاربری</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>پروفایل</DropdownMenuItem>
        <DropdownMenuItem>تنظیمات</DropdownMenuItem>
        <DropdownMenuItem>خروج</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">منو با آیکون</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>عملیات</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>👤 ویرایش</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>🗑️ حذف</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>🚪 خروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const CheckboxItem: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">گزینه‌ها</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>تنظیمات نمایش</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>نمایش تاریخ</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>نمایش ساعت</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked disabled>
          حالت تاریک
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
