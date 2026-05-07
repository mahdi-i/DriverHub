"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ۱. تعریف نوع داده‌ها برای اینکه بدانیم چه چیزی دریافت می‌کنیم
interface ChartData {
  name: string;
  price: number;
}

interface BasicChartProps {
  data: ChartData[]; // داده‌هایی که از بک‌اند می‌آیند
}

export function BasicChart({ data }: BasicChartProps) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }} // تنظیم اندازه فونت
          />
          <YAxis
            tick={{ fontSize: 12 }}
            domain={["auto", "auto"]} // نمایش خودکار مقیاس
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "none",
              color: "#fff",
            }} // استایل دارک مود
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 3 }} // اندازه نقطه‌ها روی خط
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
