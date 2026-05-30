import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const meta = {
  title: "shadcn/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>لیست آخرین تراکنش‌ها</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">شناسه</TableHead>
          <TableHead>حساب</TableHead>
          <TableHead>مبلغ</TableHead>
          <TableHead className="text-right">وضعیت</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>پرداخت از طریق کارت بانکی</TableCell>
          <TableCell>$250.00</TableCell>
          <TableCell className="text-right">موفق</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>پرداخت از طریق کیف پول</TableCell>
          <TableCell>$150.00</TableCell>
          <TableCell className="text-right">در انتظار</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>برگشت وجه</TableCell>
          <TableCell>$50.00</TableCell>
          <TableCell className="text-right">ناموفق</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>مجموع</TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WithHover: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>نام</TableHead>
          <TableHead>نقش</TableHead>
          <TableHead>وضعیت</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>علی رضایی</TableCell>
          <TableCell>مدیر</TableCell>
          <TableCell>فعال</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>سارا محمدی</TableCell>
          <TableCell>توسعه‌دهنده</TableCell>
          <TableCell>فعال</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>رضا کریمی</TableCell>
          <TableCell>طراح</TableCell>
          <TableCell>غیرفعال</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
