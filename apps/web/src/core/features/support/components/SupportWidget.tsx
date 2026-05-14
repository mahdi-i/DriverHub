"use client";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Input } from "@/core/components/shadcn/ui/input/input";
import { Loader2, MessageSquare, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// اتصال به سوکت (بهتر است در یک فایل جداگانه ثابت باشد تا چندین بار کانکت نشود)
const socket = io("http://localhost:3001", {
  autoConnect: false,
});

interface SupportWidgetProps {
  userId: string;
  isAdmin?: boolean;
}

interface Message {
  id: string;
  content: string;
  createdAt: string;
  senderId: string;
  sender?: {
    id: string;
    profile?: {
      fullName?: string;
      avatar?: string;
    };
  };
}

export default function SupportWidget({
  userId,
  isAdmin = false,
}: SupportWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. لود تاریخچه چت
  const loadHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3001/support/history/${userId}`,
      );
      if (res.ok) {
        const data: Message[] = await res.json();
        // مرتب‌سازی پیام‌ها بر اساس زمان
        const sortedMessages = data.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        setMessages(sortedMessages);
      }
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // 2. اتصال به سوکت و گوش دادن به پیام‌ها
  useEffect(() => {
    socket.connect();

    const handleNewMessage = (msg: Message) => {
      // اگر پیام متعلق به این چت است (یا از سمت کاربر است یا ادمین)
      // در سیستم پشتیبانی، ما همیشه با ادمین چت می‌کنیم.
      // اگر پیام از سمت کاربر (خودمان) باشد، اضافه کن
      // اگر پیام از سمت ادمین باشد، اضافه کن
      if (
        msg.senderId === userId ||
        msg.senderId === "fe335b0b-8a8c-4e55-ad8e-a736a54cbd68"
      ) {
        setMessages((prev) => {
          // جلوگیری از داپلیکیت
          const exists = prev.find((m) => m.id === msg.id);
          if (!exists) {
            return [...prev, msg];
          }
          return prev;
        });
      }
    };

    socket.on("receiveMessage", handleNewMessage);

    return () => {
      socket.off("receiveMessage", handleNewMessage);
    };
  }, [userId]);

  // 3. اسکرول به پایین
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // 4. لود تاریخچه وقتی پنجره باز می‌شود
  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen, loadHistory]);

  // 5. ارسال پیام
  const handleSend = () => {
    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {
      senderId: userId, // کاربر خودش فرستنده است
      content: newMessage,
      // receiverId را نمی‌فرستیم چون بک‌اند آن را به ادمین تبدیل می‌کند
    });

    // نمایش موقت پیام (Optimistic UI)
    const tempMsg: Message = {
      id: Date.now().toString(), // ID موقت
      content: newMessage,
      createdAt: new Date().toISOString(),
      senderId: userId,
      sender: {
        id: userId,
        profile: {
          fullName: "شما",
          avatar: "/default-avatar.png",
        },
      },
    };

    setMessages((prev) => [...prev, tempMsg]);
    setNewMessage("");
  };

  return (
    <>
      {/* دکمه باز کردن چت */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-110 flex items-center justify-center"
        aria-label="پشتیبانی"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* پنجره چت */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200">
          {/* هدر */}
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm">پشتیبانی آنلاین</h3>
              <p className="text-xs opacity-80">
                معمولاً در کمتر از ۵ دقیقه پاسخ می‌دهیم
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* لیست پیام‌ها */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {isLoading && messages.length === 0 ? (
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin h-6 w-6 text-primary" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-10 text-sm">
                هنوز پیامی ارسال نشده است.
              </div>
            ) : (
              messages.map((msg, index) => {
                // *** اصلاح مهم ***
                // اگر senderId برابر با userId (کاربر) باشد، یعنی پیام "من" است
                const isMe = msg.senderId === userId;

                return (
                  <div
                    key={msg.id || index}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm text-sm ${
                        isMe
                          ? "bg-primary text-primary-foreground rounded-br-none" // پیام من: آبی
                          : "bg-white border border-gray-200 text-foreground rounded-bl-none" // پیام ادمین: سفید
                      }`}
                    >
                      <p>{msg.content}</p>
                      <span className="text-[10px] opacity-70 mt-1 block text-right">
                        {new Date(msg.createdAt).toLocaleTimeString("fa-IR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ورودی پیام */}
          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <Input
                placeholder="پیام خود را بنویسید..."
                className="flex-1 h-10 text-sm"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <Button size="icon" onClick={handleSend} className="h-10 w-10">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
