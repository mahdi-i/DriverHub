# 🚗 DriverHub

> سیستم مدیریت آموزشگاه رانندگی | Driving School Management System

<div align="center">


![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Upstash_Redis-FF4438?style=for-the-badge&logo=redis&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 📖 درباره پروژه

**DriverHub** یک سیستم جامع مدیریت آموزشگاه رانندگی است که با استفاده از تکنولوژی‌های مدرن وب ساخته شده است. این سیستم امکانات زیر را فراهم می‌کند:

- ✅ مدیریت رانندگان (مربیان)
- ✅ مدیریت برنامه کاری هفتگی
- ✅ سیستم رزرو و نوبت‌دهی
- ✅ فیلتر های دانامیک هوشمند سرچ
- ✅ پنل مدیریت
- ✅ داشبورد رانندگان
- ✅ داشبورد آموزگار
- ✅ داشبورد ادمین

---

## 🏗️ معماری

### Monorepo Structure
DriverHub/
├── apps/
│ ├── api/ # NestJS Backend
│ └── web/ # Next.js Frontend
│
└── packages/
├── shared-constants/ # Constants مشترک
├── shared-types/ # TypeScript Types مشترک
└── shared-utils/ # Utility Functions مشترک


### Tech Stack

| بخش | تکنولوژی |
|-----|----------|
| **Frontend** | Next.js 16, React 19, Tailwind CSS, Shadcn UI |
| **Backend** | NestJS 11, TypeORM, PostgreSQL |
| **Cache** | Redis |
| **Language** | TypeScript 5.7 |
| **Package Manager** | pnpm |

---

## 🔧 پیش‌نیازها

- **Node.js** v20+
- **pnpm** v8+
- **PostgreSQL** v16+
- **Redis** v7+
- **Docker** 

---

## 🚀 نصب و راه‌اندازی

## ۱. کلون کردن پروژه


```bash
git clone https://github.com/Mahdi-Devm/DriverHub.git
cd DriverHub
```

## نصب وابستگی‌ها
```bash
pnpm install
```

## کافینگ env و ران کردن docker
```bash
docker-compose up -d
```
## اجرای بک‌اند
```bash
cd apps/api
pnpm start:dev
```


### اجرای فرانت‌اند (در ترمینال جدید)

```bash
cd apps/web
pnpm dev
```
---
## اجرای داکیومنت بک اند
```bash
Swagger docs: http://localhost:3000/api/docs
```


---



ساخته شده با ❤️

