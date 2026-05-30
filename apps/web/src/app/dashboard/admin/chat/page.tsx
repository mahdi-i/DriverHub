"use client";
import { TypographyMuted } from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";
import { Input } from "@/core/components/shadcn/ui/input/input";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { Loader2, Search, Send } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001", {
  autoConnect: false,
});

const ADMIN_ID = "fe335b0b-8a8c-4e55-ad8e-a736a54cbd68";
const ADMIN_AVATAR = "/img/dashboard/driver/profile/avatar-4c776756.svg";

interface User {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface Message {
  id: string;
  content: string;
  createdAt: string;
  senderId: string;
  sender?: {
    id: string;
    role?: string;
    profile?: {
      fullName?: string;
      avatar?: string;
      role?: string;
    };
  };
}

export default function AdminSupportPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 1. اتصال به سوکت
  useEffect(() => {
    socket.connect();

    const handleNewMessage = (msg: Message) => {
      console.log(msg);
      if (
        activeUser &&
        (msg.sender.id === activeUser.id || msg.sender.id === ADMIN_ID)
      ) {
        // اگر پیام از سمت ادمین است و کاربر فعال است، اضافه کن
        // اگر پیام از سمت کاربر است و کاربر فعال است، اضافه کن
        setMessages((prev) => [...prev, msg]);
      }
      if (msg.sender.id !== ADMIN_ID) {
        setUsers((prevUsers) => {
          const userIndex = prevUsers.findIndex((u) => u.id === msg.sender.id);
          if (userIndex >= 0) {
            const updatedUsers = [...prevUsers];
            updatedUsers[userIndex] = {
              ...updatedUsers[userIndex],
              lastMessage: msg.content,
              time: new Date(msg.createdAt).toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              unread: updatedUsers[userIndex].unread + 1,
            };
            return updatedUsers;
          } else {
            const newUser: User = {
              id: msg.sender.id,
              name:
                msg.sender?.profile?.fullName ||
                msg.sender?.role ||
                "کاربر ناشناس",
              lastMessage: msg.content,
              time: new Date(msg.createdAt).toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              unread: 1,
            };
            return [newUser, ...prevUsers];
          }
        });
      }
    };

    socket.on("receiveMessage", handleNewMessage);

    return () => {
      socket.off("receiveMessage", handleNewMessage);
    };
  }, [activeUser]);

  const loadActiveChats = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3001/support/inbox");
      if (!res.ok) throw new Error("Failed to fetch chats");

      const data: Message[] = await res.json();

      const userMap = new Map<string, User>();

      data.forEach((msg) => {
        if (msg.sender?.id !== ADMIN_ID) {
          const userId = msg.sender?.id;
          if (userId) {
            if (!userMap.has(userId)) {
              userMap.set(userId, {
                id: userId,
                name:
                  msg.sender?.profile?.fullName ||
                  msg.sender?.role ||
                  "کاربر ناشناس",
                lastMessage: msg.content,
                time: new Date(msg.createdAt).toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                unread: 1,
              });
            } else {
              const existing = userMap.get(userId)!;
              existing.lastMessage = msg.content;
              existing.time = new Date(msg.createdAt).toLocaleTimeString(
                "fa-IR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              );
            }
          }
        }
      });

      setUsers(Array.from(userMap.values()));

      const firstUser = Array.from(userMap.values())[0];
      if (firstUser && !activeUser) {
        setActiveUser(firstUser);
      }
    } catch (error) {
      console.error("Error loading chats:", error);
    } finally {
      setIsLoading(false);
    }
  }, [activeUser]);

  useEffect(() => {
    if (activeUser) {
      const loadHistory = async () => {
        try {
          const res = await fetch(
            `${BASE_URL}/support/history/${activeUser.id}`,
          );
          const data: Message[] = await res.json();
          setMessages(data);

          setUsers((prev) =>
            prev.map((u) => (u.id === activeUser.id ? { ...u, unread: 0 } : u)),
          );
        } catch (error) {
          console.error("Error loading history:", error);
        }
      };
      loadHistory();
    }
  }, [activeUser]);

  useEffect(() => {
    loadActiveChats();
  }, [loadActiveChats]);

  const handleSend = () => {
    if (!newMessage.trim() || !activeUser) return;

    // ارسال receiverId برای اطمینان از اینکه پیام به کاربر درست می‌رسد
    socket.emit("sendMessage", {
      senderId: ADMIN_ID,
      content: newMessage,
      receiverId: activeUser.id, // خیلی مهم!
    });

    const tempMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      createdAt: new Date().toISOString(),
      senderId: ADMIN_ID,
      sender: {
        id: ADMIN_ID,
        profile: {
          fullName: "پشتیبانی",
          avatar: ADMIN_AVATAR,
        },
      },
    };
    setMessages((prev) => [...prev, tempMsg]);
    setNewMessage("");
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-[80vh] w-full gap-4 p-4 bg-secondary-foreground rounded-2xl">
      <div className="w-[30%] h-full overflow-hidden flex flex-col bg-white rounded-l-2xl shadow-lg">
        <CardContent className="p-4 space-y-4 h-full flex flex-col">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="جستجوی مخاطب..." className="pl-9" />
          </div>
          <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => setActiveUser(user)}
                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                  activeUser?.id === user.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="relative">
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <TypographyMuted className="font-semibold text-sm truncate block">
                    {user.name}
                  </TypographyMuted>
                  <TypographyMuted className="text-xs text-muted-foreground truncate block">
                    {user.lastMessage}
                  </TypographyMuted>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-muted-foreground">
                    {user.time}
                  </span>
                  {user.unread > 0 && (
                    <div className="bg-primary text-primary-foreground text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                      {user.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>

      <Card className="w-[70%] h-full flex flex-col rounded-r-3xl overflow-hidden border-l-0 shadow-lg">
        {activeUser ? (
          <>
            <CardContent className="p-4 border-b flex items-center gap-3 justify-between bg-white">
              <div className="flex items-center gap-3">
                <div>
                  <TypographyMuted className="font-bold text-sm">
                    {activeUser.name}
                  </TypographyMuted>
                  <TypographyMuted className="text-xs text-green-600">
                    آنلاین
                  </TypographyMuted>
                </div>
              </div>
            </CardContent>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, index) => {
                const isMe = msg.sender.id === ADMIN_ID;
                return (
                  <div
                    key={msg.id || index}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                        isMe
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <span
                        className={`text-[10px] opacity-70 mt-1 block text-right ${
                          isMe ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString("fa-IR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </CardContent>

            <CardContent className="p-4 border-t bg-white">
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="پیام خود را بنویسید..."
                  className="flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <TypographyMuted className="text-gray-400">
              یک کاربر را برای شروع چت انتخاب کنید
            </TypographyMuted>
          </div>
        )}
      </Card>
    </div>
  );
}
