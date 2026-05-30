import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "shadcn/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "success", "outline"],
      description: "نوع استایل بج",
    },
    className: {
      control: "text",
      description: "کلاس‌های CSS سفارشی",
    },
    asChild: {
      control: "boolean",
      description: "آیا از Slot استفاده شود؟",
    },
  },
  args: {
    asChild: false,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "پیش‌فرض",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "ثانویه",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "خطا",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "موفق",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "محاطی",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "default",
    children: "تیک ✓",
  },
};
