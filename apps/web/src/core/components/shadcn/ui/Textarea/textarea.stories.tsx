import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "./textarea";

const meta = {
  title: "shadcn/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "متن لیبل بالای تکست‌اریا",
    },
    placeholder: {
      control: "text",
      description: "متن پیش‌فرض (Placeholder)",
    },
    disabled: {
      control: "boolean",
      description: "غیرفعال کردن فیلد",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "متن خود را اینجا بنویسید...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "توضیحات تکمیلی",
    placeholder: "جزئیات بیشتری اضافه کنید...",
  },
};

export const Disabled: Story = {
  args: {
    label: "غیرفعال",
    value: "این فیلد غیرفعال است",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: "ایمیل",
    placeholder: "example@mail.com",
    className:
      "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
  },
  render: (args) => (
    <div className="space-y-2">
      <Textarea {...args} aria-invalid="true" />
      <span className="text-sm text-destructive">فرمت ایمیل صحیح نیست</span>
    </div>
  ),
};
