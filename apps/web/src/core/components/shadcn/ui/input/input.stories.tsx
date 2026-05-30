import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "shadcn/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "کلاس مد نظر وارد کنید",
    },
    label: {
      control: "text",
      description: "لیبل مد نظر وارد کنید",
    },
    type: {
      control: "select",
      options: ["text", "phone", "number", "password", "email", "checkbox"],

      description: "تایپ مد نظر",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;
export const Default: Story = {
  args: {
    label: "نام",
    type: "text",
    placeholder: "نام خود را وارد کنید",
  },
};

export const Email: Story = {
  args: {
    label: "ایمیل",
    type: "email",
    placeholder: "example@email.com",
  },
};

export const Password: Story = {
  args: {
    label: "رمز عبور",
    type: "password",
    placeholder: "رمز عبور را وارد کنید",
  },
};

export const Number: Story = {
  args: {
    label: "سن",
    type: "number",
    placeholder: "25",
  },
};

export const WithoutLabel: Story = {
  args: {
    type: "text",
    placeholder: "فقط input",
  },
};
