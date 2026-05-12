"use client";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function ModernLineChart({
  data,
  dataKey,
  height = 300,
  nameKey = "name",
  strokeColor = "var(--color-primary)",
}) {
  const gradientId = `gradient-${dataKey}`;

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
            opacity={0.2}
          />

          <XAxis
            dataKey={nameKey}
            tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            dx={-10}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-background)",
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              color: "var(--color-foreground)",
            }}
            itemStyle={{
              color: strokeColor,
              fontWeight: 600,
            }}
            labelStyle={{
              color: "var(--color-muted-foreground)",
              marginBottom: "4px",
            }}
          />

          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="none"
            fill={`url(#${gradientId})`}
          />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={strokeColor}
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "var(--color-background)",
              stroke: strokeColor,
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: strokeColor,
              stroke: "var(--color-background)",
              strokeWidth: 2,
              filter: `drop-shadow(0px 0px 4px ${strokeColor})`,
            }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ModernBarChart({
  data,
  dataKey,
  height = 300,
  nameKey = "name",
  fillColor = "var(--color-secondary)",
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
            opacity={0.2}
          />
          <XAxis
            dataKey={nameKey}
            tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            dx={-10}
          />
          <Tooltip
            cursor={{
              fill: "var(--color-muted)",
              opacity: 0.3,
            }}
            contentStyle={{
              backgroundColor: "var(--color-background)",
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              color: "var(--color-foreground)",
            }}
            itemStyle={{
              color: fillColor,
              fontWeight: 600,
            }}
          />
          <Bar
            dataKey={dataKey}
            fill={fillColor}
            radius={[8, 8, 0, 0]}
            maxBarSize={40}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
