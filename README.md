# 🚗 DriverHub

> سیستم مدیریت آموزشگاه رانندگی | Driving School Management System


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

