# 🚗 DriverHub

> سیستم مدیریت آموزشگاه رانندگی | Driving School Management System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-11-red?style=flat-square&logo=nestjs)
![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat-square&logo=postgresql)
![Redis](https://img.shields.io/badge/Redis-7-red?style=flat-square&logo=redis)

</div>

---

## 📋 فهرست مطالب

- [درباره پروژه](#-درباره-پروژه)
- [معماری](#-معماری)
- [پیش‌نیازها](#-پیش‌نیازها)
- [نصب و راه‌اندازی](#-نصب-و-راه‌اندازی)
- [ساختار پروژه](#-ساختار-پروژه)
- [پکیج‌ها](#-پکیج‌ها)
- [مستندات API](#-مستندات-api)
- [نویسندگان](#-نویسندگان)

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
## 👥 Team

| نقش | نام | تخصص |
| :--- | :--- | :--- |
|  Full-Stack Lead | [Mahdi-Devm](https://github.com/Mahdi-Devm) | Backend + Frontend Support |
|  Frontend | [Sogand-mohamadiPour](https://github.com/Sogand-mohamadiPour) | Frontend |
|  Frontend | [Amir-mohammad-ahmady-1234](https://github.com/Amir-mohammad-ahmady-1234) | Frontend |


ساخته شده با ❤️

