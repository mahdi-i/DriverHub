import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta = {
  title: "shadcn/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="انتخاب کنید..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">سیب</SelectItem>
        <SelectItem value="banana">موز</SelectItem>
        <SelectItem value="blueberry">بلوبری</SelectItem>
        <SelectItem value="grapes">انگور</SelectItem>
        <SelectItem value="pineapple">آناناس</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="انتخاب شهر..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>ایران</SelectLabel>
          <SelectItem value="tehran">تهران</SelectItem>
          <SelectItem value="isfahan">اصفهان</SelectItem>
          <SelectItem value="shiraz">شیراز</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>فرانسه</SelectLabel>
          <SelectItem value="paris">پاریس</SelectItem>
          <SelectItem value="lyon">لیون</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="غیرفعال" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">گزینه ۱</SelectItem>
        <SelectItem value="2">گزینه ۲</SelectItem>
      </SelectContent>
    </Select>
  ),
};
