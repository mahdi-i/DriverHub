// components/SocketClient.js
"use client"; // این خط برای Next.js App Router ضروری است تا مشخص شود این کامپوننت سمت کلاینت است

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function SocketClient() {
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // اتصال به سرور NestJS
    // فرض می‌کنیم سرور شما روی پورت 3000 در حال اجراست
    const socketInstance = io("http://localhost:3001");

    setSocket(socketInstance);

    // گوش دادن به رویداد 'randomData'
    socketInstance.on("randomData", (receivedData) => {
      console.log("Received from server:", receivedData);
      setData((prevData) => [receivedData, ...prevData].slice(0, 10)); // فقط ۱۰ مورد آخر را نگه دار
    });

    // تمیزکاری وقتی کامپوننت حذف می‌شود
    return () => {
      socketInstance.disconnect();
    };
  }, []); // آرایه خالی یعنی فقط یک بار هنگام لود شدن اجرا شود

  return (
    <div style={{ padding: "20px" }}>
      <h2>Next.js WebSocket Client</h2>
      <p>اتصال وضعیت: {socket ? "متصل ✅" : "در حال اتصال..."}</p>
      <ul>
        {data.map((item, index) => (
          <li key={index}>عدد دریافتی: {item}</li>
        ))}
      </ul>
    </div>
  );
}
