// src/app/(pages)/page.tsx
"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { BasicChart } from "../../ui/chart/BasicChart";

interface ChartData {
  name: string;
  price: number;
}

export default function Chart() {
  // ۱. State برای نگهداری داده‌های نمودار
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // ۲. اتصال به بک‌اند (پورت 3001)
    const socketInstance = io("http://localhost:3001");
    setSocket(socketInstance);

    // ۳. گوش دادن به رویداد
    socketInstance.on("chartData", (newDataPoint: ChartData) => {
      console.log("New data received:", newDataPoint);

      // ۴. آپدیت کردن State
      setChartData((prevData) => {
        // اضافه کردن داده جدید به انتهای آرایه
        const newData = [...prevData, newDataPoint];

        // نگه داشتن فقط ۱۰ داده آخر برای جلوگیری از شلوغی
        if (newData.length > 10) {
          return newData.slice(newData.length - 10);
        }
        return newData;
      });
    });

    // تمیزکاری
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      <h1>تحلیل لحظه‌ای قیمت</h1>

      {/* ۵. ارسال داده‌ها به کامپوننت نمودار */}
      {chartData.length > 0 ? (
        <BasicChart data={chartData} />
      ) : (
        <p>در حال دریافت داده‌ها...</p>
      )}
    </main>
  );
}
