import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta: Meta<typeof Card> = {
  title: "shadcn/Card",
  component: Card,
  argTypes: {
    className: { control: false },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>عنوان کارت</CardTitle>
          <CardDescription>توضیحات کوتاه</CardDescription>
        </CardHeader>
        <CardContent>محتویات داخلی کارت اینجا قرار می‌گیرد</CardContent>
        <CardFooter>افزودنی‌های پایین کارت</CardFooter>
      </>
    ),
  },
};
