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

interface ChartData {
  name: string;
  price: number;
}

interface BasicChartProps {
  data: ChartData[];
}

export function BasicChart({ data }: BasicChartProps) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "none",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#fdb913"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
