// src/ws/ws.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChartDataDto } from './chart-data.dto';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000', // آدرس فرانت‌اند
  },
})
export class WsGateway {
  @WebSocketServer()
  server: Server;

  // وقتی سرور شروع به کار کرد
  afterInit() {
    console.log('WebSocket Server Initialized');
    // شروع ارسال داده‌های خودکار
    this.startDataStreaming();
  }

  // متدی که داده‌ها را هر ۲ ثانیه تولید و ارسال می‌کند
  startDataStreaming() {
    setInterval(() => {
      // ۱. تولید نام زمان (مثلاً 10:05:23)
      const now = new Date();
      const timeString = now.toLocaleTimeString('fa-IR');

      // ۲. تولید قیمت تصادفی (بین ۱۰۰ تا ۱۵۰)
      const randomPrice = Math.floor(Math.random() * 50) + 100;

      // ۳. ساخت آبجکت داده
      const data: ChartDataDto = {
        name: timeString,
        price: randomPrice,
      };

      // ۴. ارسال به تمام کلاینت‌های متصل
      // نام رویداد 'chartData' باید با چیزی که در فرانت گوش می‌دهید یکی باشد
      this.server.emit('chartData', data);

      console.log(`Sent data: ${JSON.stringify(data)}`);
    }, 2000); // هر ۲ ثانیه
  }
}
