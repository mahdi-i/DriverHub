//This section was completely developed with
//  artificial intelligence, and it was developed
//  with artificial intelligence because we do not
//  have enough experience in
//  developing web sockets on the front end,
//  and I only developed the back-end section myself.
"use client";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Input } from "@/core/components/shadcn/ui/input/input";
import { Loader2, MessageSquare, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3001";

interface User {
  id: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  sender: User;
  receiver: User;
}

interface SupportWidgetProps {
  userId: string;
}

export default function SupportWidget({ userId }: SupportWidgetProps) {
  const socketRef = useRef<Socket | null>(null);

  const [status, setStatus] = useState<
    "Connecting" | "Connected" | "Disconnected"
  >("Connecting");

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (socketRef.current) {
      return;
    }

    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socketRef.current = newSocket;

    newSocket.on("receiveMessage", (data: Message) => {
      console.log("پیام جدید از سرور:", data);
      setMessages((prev) => {
        const exists = prev.some((msg) => msg.id === data.id);
        if (exists) return prev;
        return [...prev, data];
      });
    });

    newSocket.on("connect", () => {
      console.log("متصل شد:", newSocket.id);
      setStatus("Connected");

      setIsLoading(true);
      newSocket.emit(
        "requestHistory",
        { userId },
        (response: Message[] | null) => {
          if (response && Array.isArray(response)) {
            const sortedMessages = response.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            );
            setMessages(sortedMessages);
          }
          setIsLoading(false);
        },
      );
    });

    newSocket.on("disconnect", () => setStatus("Disconnected"));
    newSocket.on("connect_error", (err) => {
      console.error("خطا:", err.message);
      setStatus("Disconnected");
    });

    return () => {};
  }, [userId]);

  const handleSendMessage = useCallback(() => {
    if (!inputMessage.trim() || !socketRef.current) return;

    const currentMessage = inputMessage;
    setInputMessage("");

    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
      content: currentMessage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isRead: false,
      sender: {
        id: userId,
        phone: "",
        role: "",
        createdAt: "",
        updatedAt: "",
      },
      receiver: {
        id: "",
        phone: "",
        role: "",
        createdAt: "",
        updatedAt: "",
      },
    };

    setMessages((prev) => [...prev, tempMessage]);

    socketRef.current.emit(
      "sendMessage",
      {
        senderId: userId,
        content: currentMessage,
      },
      (response) => {
        if (response && response.error) {
          setMessages((prev) =>
            prev.filter((msg) => msg.id !== tempMessage.id),
          );
        }
      },
    );
  }, [inputMessage, userId]);

  const handleSend = () => {
    handleSendMessage();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary transition-all hover:scale-110 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-80 md:w-96 h-125 bg-gray-50 rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-white p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-800">پشتیبانی آنلاین</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span
                  className={`w-2 h-2 rounded-full ${status === "Connected" ? "bg-green-500" : "bg-red-500"}`}
                ></span>
                {status === "Connected" ? "آنلاین" : "آفلاین"}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading && messages.length === 0 ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin h-8 w-8 text-prbg-primary" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-20 text-sm">
                هنوز پیامی رد و تبادل نشده است.
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.sender.id === userId;
                const isTemp = msg.id.startsWith("temp-");

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm text-sm leading-relaxed ${
                        isMe
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <span
                        className={`text-[10px] mt-1.5 block text-right ${
                          isMe ? "text-blue-100" : "text-gray-400"
                        } ${isTemp ? "italic opacity-70" : ""}`}
                      >
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

          <div className="p-3 bg-white border-t">
            <div className="flex gap-2">
              <Input
                placeholder="پیام خود را بنویسید..."
                className="flex-1 h-10 text-sm bg-gray-50 border-gray-200 focus:bg-white"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!inputMessage.trim()}
                className="h-10 w-10 bg-primary hover:bg-blue-700 disabled:opacity-50"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
