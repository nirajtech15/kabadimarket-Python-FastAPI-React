<div align="center">

# ♻️ KabadiMarket

### Modern Scrap Pickup Platform for India

*A Production-Ready Full Stack Web Application built using FastAPI, React, TypeScript & PostgreSQL*

---

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

---

### 🚀 Full Stack • REST API • JWT Authentication • PostgreSQL • React Query • Docker Ready

</div>

---

# 📖 Project Overview

KabadiMarket is a **modern Scrap Pickup Management Platform** designed to simplify scrap collection for customers while providing administrators with powerful tools to manage operations.

The application follows a **production-ready Full Stack Architecture** using **FastAPI**, **React**, **TypeScript**, **PostgreSQL**, **JWT Authentication**, and **React Query**.

Customers can schedule scrap pickups, view live scrap prices, calculate estimated earnings, and contact the business. Administrators can securely manage bookings, update scrap prices, moderate customer reviews, and monitor dashboard statistics through a dedicated admin panel.

The project demonstrates modern software engineering practices including RESTful APIs, layered architecture, reusable React components, SQLAlchemy ORM, secure authentication, and scalable folder organization.

---

# ✨ Key Features

## 👤 Customer Features

- ♻️ Online Scrap Pickup Booking
- 💰 Live Scrap Rate List
- 🧮 Interactive Scrap Price Calculator
- 📱 Fully Responsive Design
- ⭐ Customer Review System
- 📞 Contact Form
- 📅 Pickup Scheduling
- 📍 Location Based Service Ready

---

## 🔐 Admin Features

- Secure JWT Authentication
- Dashboard Analytics
- Booking Management
- Live Scrap Price Management
- Customer Message Management
- Review Moderation
- Booking Status Updates
- Secure Protected Routes

---

## ⚙️ Technical Features

- FastAPI REST API
- SQLAlchemy ORM
- PostgreSQL Database
- React 18 + TypeScript
- React Query Data Caching
- Axios API Layer
- Context API Authentication
- Tailwind CSS UI
- Modular Folder Structure
- Docker Support
- Production Ready Architecture

---

# 🏆 Highlights

| Feature | Status |
|----------|--------|
| Full Stack Architecture | ✅ |
| JWT Authentication | ✅ |
| PostgreSQL Integration | ✅ |
| REST API | ✅ |
| React Query | ✅ |
| CRUD Operations | ✅ |
| Admin Dashboard | ✅ |
| Responsive UI | ✅ |
| Docker Support | ✅ |
| Production Ready Structure | ✅ |

---


## 📸 Screenshots

<table align="center">
<tr>

<td align="center">
<img src="./docs/home.png" width="300"/><br><br>
<b>🏠 Home</b>
</td>

<td align="center">
<img src="./docs/rates.png" width="300"/><br><br>
<b>💰 Pricing Plans</b>
</td>

<td align="center">
<img src="./docs/booking.png" width="300"/><br><br>
<b>📅 Booking</b>
</td>

</tr>

<tr>

<td align="center">
<img src="./docs/admin-dashboard.png" width="300"/><br><br>
<b>📊 Admin Dashboard</b>
</td>

<td align="center">
<img src="./docs/booking-admin.png" width="300"/><br><br>
<b>🔐 Booking</b>
</td>

<td align="center">
<img src="./docs/services.png" width="300"/><br><br>
<b>👤 Services</b>
</td>

</tr>

</table>

# 🏗️ System Architecture

```text
                    Client (Browser)
                           │
                           ▼
                 React + TypeScript
                           │
                 React Query + Axios
                           │
                    REST API Calls
                           │
                           ▼
                  FastAPI Backend
                           │
               SQLAlchemy ORM Layer
                           │
                           ▼
                  PostgreSQL Database
```

---

# 🔄 Request Flow

```text
User Action
      │
      ▼
React Component
      │
      ▼
React Query
      │
      ▼
Axios API Layer
      │
      ▼
FastAPI Router
      │
      ▼
Pydantic Validation
      │
      ▼
SQLAlchemy ORM
      │
      ▼
PostgreSQL
      │
      ▼
JSON Response
      │
      ▼
React Query Cache
      │
      ▼
UI Re-render
```

---

# 🎯 Project Goals

- Build a scalable Scrap Pickup Management Platform
- Learn modern Full Stack Architecture
- Demonstrate FastAPI + React integration
- Implement secure JWT authentication
- Follow production-grade coding practices
- Showcase enterprise project structure
- Build a portfolio-ready application
---

# 📂 Project Structure

```text
kabadimarket/
│
├── backend/                     # FastAPI Backend
│   ├── app/
│   │   ├── core/                # Config, JWT, Security
│   │   ├── models/              # SQLAlchemy Models
│   │   ├── routers/             # REST API Endpoints
│   │   ├── schemas/             # Pydantic Schemas
│   │   ├── database.py          # Database Connection
│   │   └── main.py              # Application Entry Point
│   │
│   ├── requirements.txt
│   ├── init.sql
│   ├── seed.py
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/                    # React + TypeScript
│   ├── src/
│   │   ├── api/                 # Axios API Layer
│   │   ├── components/          # Reusable Components
│   │   ├── hooks/               # Context & Custom Hooks
│   │   ├── pages/               # Application Pages
│   │   ├── pages/admin/         # Admin Dashboard
│   │   ├── styles/
│   │   └── types/
│   │
│   ├── package.json
│   ├── vite.config.ts
│   ├── Dockerfile
│   └── .env.example
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# 🚀 Quick Start (Docker)

## Prerequisites

Install:

- Docker Desktop
- Git

Clone Repository

```bash
git clone https://github.com/nirajtech15/kabadimarket-Python-FastAPI-React.git

cd kabadimarket-Python-FastAPI-React
```

Run Everything

```bash
docker-compose up --build
```

Open

| Service | URL |
|----------|-----|
| Frontend | http://localhost |
| Backend API | http://localhost:8000 |
| Swagger Docs | http://localhost:8000/docs |
| ReDoc | http://localhost:8000/redoc |

---

# 💻 Manual Local Development

## Prerequisites

Install the following software before starting.

| Software | Version |
|----------|----------|
| Python | 3.11+ |
| Node.js | 20+ |
| PostgreSQL | 16+ |
| Git | Latest |
| VS Code | Recommended |

---

# 🗄️ PostgreSQL Setup

## Create Database

```sql
CREATE DATABASE kabadimarket;
```

Create User

```sql
CREATE USER admin WITH PASSWORD 'secret';
```

Grant Permissions

```sql
GRANT ALL PRIVILEGES ON DATABASE kabadimarket TO admin;
```

Import Schema

```bash
psql -U admin -d kabadimarket -f backend/init.sql
```

---

# ⚙️ Backend Setup (FastAPI)

Move into backend folder

```bash
cd backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Create Environment File

```bash
cp .env.example .env
```

Edit `.env`

```env
DATABASE_URL=postgresql://admin:secret@localhost:5432/kabadimarket

SECRET_KEY=your-secret-key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=1440

ADMIN_USERNAME=admin

ADMIN_PASSWORD=your-password
```

Run Database Seed

```bash
python seed.py
```

Start Development Server

```bash
uvicorn app.main:app --reload
```

Backend Running

```
http://localhost:8000
```

Swagger API

```
http://localhost:8000/docs
```

---

# ⚛️ Frontend Setup (React)

Move into frontend folder

```bash
cd frontend
```

Install Packages

```bash
npm install
```

Create Environment File

```bash
cp .env.example .env
```

Frontend Environment

```env
VITE_API_URL=http://localhost:8000
```

Run Development Server

```bash
npm run dev
```

Frontend Running

```
http://localhost:5173
```

---

# 🌍 Environment Variables

## Backend

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL Connection |
| SECRET_KEY | JWT Secret |
| ALGORITHM | JWT Algorithm |
| ACCESS_TOKEN_EXPIRE_MINUTES | Token Expiry |
| ADMIN_USERNAME | Admin Login |
| ADMIN_PASSWORD | Admin Password |

---

## Frontend

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend API URL |

---

# ✅ Verify Installation

Everything is working correctly if the following URLs are accessible.

| URL | Status |
|-----|--------|
| http://localhost:5173 | Frontend |
| http://localhost:8000 | Backend |
| http://localhost:8000/docs | Swagger UI |
| http://localhost:8000/redoc | API Documentation |

---

# 🛠️ Common Development Commands

## Backend

```bash
uvicorn app.main:app --reload
```

```bash
python seed.py
```

```bash
pip install -r requirements.txt
```

---

## Frontend

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

---

## PostgreSQL

```bash
psql -U admin
```

```sql
\l
```

```sql
\dt
```

```sql
SELECT * FROM scrap_rates;
```

---

# 🐞 Troubleshooting

### Backend not starting

- Verify Python version
- Verify PostgreSQL is running
- Check DATABASE_URL
- Install missing dependencies

---

### Frontend cannot connect to Backend

Check

```env
VITE_API_URL=http://localhost:8000
```

---

### Database Connection Failed

Verify

- PostgreSQL Service Running
- Username
- Password
- Database Name
- Port 5432

---

### API returns Unauthorized

Verify

- JWT Token
- Authorization Header
- SECRET_KEY
- Token Expiration

---
---

# 📡 REST API Documentation

The backend exposes a RESTful API built with **FastAPI**. APIs are documented automatically using **Swagger UI** and **ReDoc**.

| Documentation | URL |
|---------------|-----|
| Swagger UI | http://localhost:8000/docs |
| ReDoc | http://localhost:8000/redoc |

---

# 🔌 API Endpoints

## 🌍 Public APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/rates` | Get all active scrap rates |
| GET | `/api/rates?category=paper` | Filter rates by category |
| POST | `/api/bookings` | Create scrap pickup booking |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/reviews` | Get published reviews |

---

## 🔐 Admin APIs (JWT Protected)

Authentication Required

```
Authorization: Bearer <JWT_TOKEN>
```

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/admin/login` | Login |
| GET | `/api/admin/me` | Verify logged in admin |
| GET | `/api/admin/dashboard` | Dashboard statistics |

---

### Booking Management

| Method | Endpoint |
|---------|----------|
| GET | `/api/bookings` |
| PATCH | `/api/bookings/{id}/status` |
| DELETE | `/api/bookings/{id}` |

---

### Scrap Rate Management

| Method | Endpoint |
|---------|----------|
| GET | `/api/rates/all` |
| POST | `/api/rates` |
| PUT | `/api/rates/{id}` |
| DELETE | `/api/rates/{id}` |

---

### Contact Messages

| Method | Endpoint |
|---------|----------|
| GET | `/api/contact` |
| PATCH | `/api/contact/{id}/read` |
| DELETE | `/api/contact/{id}` |

---

### Review Management

| Method | Endpoint |
|---------|----------|
| GET | `/api/reviews/all` |
| PATCH | `/api/reviews/{id}/publish` |
| DELETE | `/api/reviews/{id}` |

---

# 🔐 Authentication Flow

The application uses **JWT (JSON Web Token)** authentication.

```
Admin Login
      │
      ▼
Username + Password
      │
      ▼
FastAPI Authentication
      │
      ▼
Generate JWT Token
      │
      ▼
Return Access Token
      │
      ▼
Store Token (Local Storage)
      │
      ▼
Axios Interceptor
      │
      ▼
Authorization Header
      │
      ▼
Protected API
```

Every protected request automatically sends

```
Authorization: Bearer <token>
```

using Axios interceptors.

---

# 🗄️ Database Schema

The application uses **PostgreSQL** with **SQLAlchemy ORM**.

## Tables

| Table | Description |
|--------|-------------|
| bookings | Customer pickup requests |
| scrap_rates | Live scrap prices |
| contact_messages | Contact enquiries |
| reviews | Customer reviews |

---

## Entity Relationship

```
Customer

│

├── Booking

│

├── Contact Message

│

└── Review

Administrator

│

├── Login

├── Dashboard

├── Booking Management

├── Rate Management

└── Review Management
```

---

# 🧠 Backend Architecture

```
Request

↓

Router

↓

Pydantic Schema Validation

↓

Business Logic

↓

SQLAlchemy ORM

↓

PostgreSQL

↓

JSON Response
```

---

# ⚛️ Frontend Architecture

```
React Component

↓

React Query

↓

Axios

↓

REST API

↓

FastAPI

↓

JSON

↓

React Query Cache

↓

Component Re-render
```

---

# 💻 Technology Stack

## Backend

| Technology | Purpose |
|------------|---------|
| Python 3.11+ | Programming Language |
| FastAPI | REST API Framework |
| SQLAlchemy | ORM |
| Pydantic | Validation |
| PostgreSQL | Database |
| Alembic | Database Migration |
| python-jose | JWT Authentication |
| Passlib | Password Hashing |

---

## Frontend

| Technology | Purpose |
|------------|---------|
| React 18 | UI |
| TypeScript | Type Safety |
| Vite | Build Tool |
| React Query | Server State |
| Axios | HTTP Client |
| React Router | Routing |
| Tailwind CSS | Styling |
| React Hook Form | Forms |
| React Hot Toast | Notifications |

---

## DevOps

| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container |
| Git | Version Control |
| GitHub | Source Code Hosting |

---

# 📄 Application Pages

## Public Pages

| Route | Description |
|-------|-------------|
| / | Home |
| /services | Services |
| /rates | Live Scrap Rates |
| /booking | Booking |
| /about | About |
| /contact | Contact |

---

## Admin Pages

| Route | Description |
|-------|-------------|
| /admin/login | Login |
| /admin | Dashboard |
| /admin/bookings | Booking Management |
| /admin/rates | Rate Management |
| /admin/messages | Contact Messages |
| /admin/reviews | Review Management |

---

# ☁️ Production Deployment

The project can be deployed using:

| Platform | Status |
|----------|--------|
| Railway | ✅ |
| Render | ✅ |
| DigitalOcean | ✅ |
| VPS | ✅ |
| AWS EC2 | ✅ |
| Docker | ✅ |

---

# 🔒 Security Features

- JWT Authentication
- Protected Admin Routes
- Password Hashing (bcrypt)
- SQLAlchemy ORM (SQL Injection Protection)
- Pydantic Request Validation
- CORS Configuration
- Environment Variables
- Secure Password Storage

---

# ⚡ Performance Optimizations

- React Query Data Cache
- Lazy API Requests
- Axios Instance Reuse
- SQLAlchemy Connection Pool
- FastAPI Async Support
- Component Re-render Optimization
- Reusable React Components
- Modular Backend Architecture

---

# 🛣️ Project Roadmap

The project is actively designed to evolve into a complete production-ready Scrap Pickup Platform.

## ✅ Version 1.0 (Current)

- Customer Scrap Booking
- Live Scrap Rates
- Admin Dashboard
- JWT Authentication
- Contact Form
- Customer Reviews
- PostgreSQL Database
- REST API
- Docker Support

---

## 🚀 Version 1.1

- Email Notifications
- Booking Confirmation
- Admin Activity Logs
- Pagination
- Search & Filtering
- Improved Dashboard Analytics

---

## 🚀 Version 1.2

- OTP Login
- SMS Notifications
- Image Upload
- PDF Invoice
- Pickup Tracking
- Google Maps Integration

---

## 🚀 Version 2.0

- Multi City Support
- Multi Vendor Support
- Payment Gateway
- Customer Wallet
- Referral System
- Admin Reports

---

## ☁️ Future Vision

- AWS Deployment
- CI/CD Pipeline
- Redis Cache
- Background Jobs (Celery)
- Kubernetes
- AI Price Prediction
- Mobile Application (React Native)
- WhatsApp Bot Integration

---

# 🧪 Testing

The project is designed to support multiple testing strategies.

### Backend

- Unit Testing
- API Testing
- Integration Testing

### Frontend

- Component Testing
- UI Testing
- End-to-End Testing

Recommended Tools

- Pytest
- Postman
- React Testing Library
- Playwright

---

# 📦 Git Workflow

A recommended Git workflow for contributors.

```bash
git clone <repository>

git checkout -b feature/new-feature

git add .

git commit -m "feat: add new feature"

git push origin feature/new-feature
```

Create a Pull Request for review.

---

# 🤝 Contributing

Contributions are always welcome.

If you'd like to improve this project:

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

Please follow clean code principles and meaningful commit messages.

---

# 📈 Learning Objectives

This project demonstrates practical implementation of:

- Full Stack Web Development
- FastAPI Backend Development
- React + TypeScript
- PostgreSQL Integration
- SQLAlchemy ORM
- JWT Authentication
- REST API Design
- React Query
- Axios
- Docker
- Production Project Structure

---

# 🎯 What I Learned

While building this project I explored:

- Designing REST APIs using FastAPI
- Structuring scalable backend applications
- Creating reusable React components
- Managing authentication using JWT
- Integrating PostgreSQL with SQLAlchemy
- Using React Query for server state management
- Building CRUD operations
- Organizing a production-ready project architecture

---

# 📚 Useful Resources

- FastAPI Documentation
- React Documentation
- TypeScript Documentation
- PostgreSQL Documentation
- SQLAlchemy Documentation
- React Query Documentation
- Docker Documentation

---

# 📊 Project Summary

| Category | Status |
|----------|--------|
| Backend | ✅ Complete |
| Frontend | ✅ Complete |
| Database | ✅ Complete |
| Authentication | ✅ Complete |
| CRUD Operations | ✅ Complete |
| REST APIs | ✅ Complete |
| Responsive UI | ✅ Complete |
| Docker Support | ✅ Complete |

---

# 👨‍💻 Author

## Niraj Singh

**Full Stack Developer**

### Technical Skills

- Python
- FastAPI
- React
- TypeScript
- Angular
- PHP
- Laravel
- CodeIgniter
- PostgreSQL
- MySQL
- SQL Server
- Docker
- AWS (Learning)
- Generative AI

GitHub

> https://github.com/nirajtech15

---

# ⭐ If You Like This Project

If you found this repository useful,

please consider:

⭐ Star this Repository

🍴 Fork it

🛠️ Contribute

📢 Share it

---

# 📜 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and learn from this project.

---

<div align="center">

## Thank You ❤️

Made with **FastAPI**, **React**, **TypeScript**, and **PostgreSQL**

by **Niraj Singh**

⭐ Happy Coding ⭐

</div>
