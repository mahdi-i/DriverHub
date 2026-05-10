"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { BasicChart } from "../../ui/chart/BasicChart";

interface ChartData {
  name: string;
  price: number;
}

export default function Chart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:3001/analysis");
    setSocket(socketInstance);

    socketInstance.on("chartData", (newDataPoint: ChartData) => {
      console.log("New data received:", newDataPoint);

      setChartData((prevData) => {
        const newData = [...prevData, newDataPoint];

        if (newData.length > 10) {
          return newData.slice(newData.length - 10);
        }
        return newData;
      });
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      <h1>تحلیل لحظه‌ای قیمت</h1>

      {chartData.length > 0 ? (
        <BasicChart data={chartData} />
      ) : (
        <p>در حال دریافت داده‌ها...</p>
      )}
    </main>
  );
}
