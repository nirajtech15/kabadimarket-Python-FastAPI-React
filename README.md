# ♻️ KabadiMarket — Full Stack Web Application

India's modern scrap pickup platform. Rebuilt with **FastAPI + React TypeScript + PostgreSQL**.

---

## 🗂️ Project Structure

```
kabadimarket/
├── backend/              # Python FastAPI backend
│   ├── app/
│   │   ├── main.py       # App entry point
│   │   ├── database.py   # SQLAlchemy DB connection
│   │   ├── models/       # ORM models
│   │   ├── routers/      # API route handlers
│   │   ├── schemas/      # Pydantic schemas
│   │   └── core/         # Config & JWT security
│   ├── init.sql          # DB schema + seed data
│   ├── seed.py           # Python seed script
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env
│
├── frontend/             # React + TypeScript frontend
│   ├── src/
│   │   ├── pages/        # Home, Services, Rates, Booking, About, Contact
│   │   ├── pages/admin/  # Admin dashboard, bookings, rates, messages, reviews
│   │   ├── components/   # Navbar, Footer, BookingForm, ScrapCalculator, PriceTicker
│   │   ├── api/          # Axios API calls
│   │   ├── types/        # TypeScript interfaces
│   │   ├── hooks/        # useAuth context
│   │   └── styles/       # Tailwind CSS
│   ├── Dockerfile        # Multi-stage build + Nginx
│   ├── nginx.conf
│   └── .env
│
├── docker-compose.yml    # Run everything with one command
└── .env                  # Root env file
```

---

## 🚀 Quick Start — Docker (Recommended)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed

### Run in 3 commands
```bash
git clone <your-repo>
cd kabadimarket
docker-compose up --build
```

**That's it!** Open:
- 🌐 **Frontend:** http://localhost
- ⚙️ **API Docs:** http://localhost:8000/docs
- 🔐 **Admin Panel:** http://localhost/admin (login: `admin` / `Admin@123`)

---

## 🛠️ Manual Local Development

### 1. PostgreSQL Database

**Option A — Docker (easiest):**
```bash
docker run -d \
  --name kabadimarket_db \
  -e POSTGRES_DB=kabadimarket \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  postgres:16-alpine
```

**Option B — Local PostgreSQL:**
```sql
CREATE DATABASE kabadimarket;
CREATE USER admin WITH PASSWORD 'secret';
GRANT ALL PRIVILEGES ON DATABASE kabadimarket TO admin;
```

Then run the schema:
```bash
psql -U admin -d kabadimarket -f backend/init.sql
```

---

### 2. Backend (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env            # Edit .env with your DB credentials

# Run development server
uvicorn app.main:app --reload --port 8000
```

> Tables are auto-created on first run. Use `python seed.py` to add sample data.

**API Docs:** http://localhost:8000/docs

---

### 3. Frontend (React + TypeScript)

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env            # Set VITE_API_URL=http://localhost:8000

# Run development server
npm run dev
```

**App:** http://localhost:5173

---

## 🗄️ Database Schema

| Table | Description |
|---|---|
| `bookings` | Customer scrap pickup requests |
| `scrap_rates` | Live prices per material (admin-editable) |
| `contact_messages` | Contact form submissions |
| `reviews` | Customer reviews (published by admin) |

---

## 🔌 API Endpoints

### Public
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/rates` | Get all active scrap rates (filterable by `?category=`) |
| POST | `/api/bookings` | Submit a pickup booking |
| POST | `/api/contact` | Submit a contact message |
| GET | `/api/reviews` | Get published reviews |

### Admin (JWT required)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/admin/login` | Get JWT token |
| GET | `/api/admin/dashboard` | Stats summary |
| GET | `/api/bookings` | All bookings (filterable by status) |
| PATCH | `/api/bookings/{id}/status` | Update booking status |
| DELETE | `/api/bookings/{id}` | Delete booking |
| GET | `/api/rates/all` | All rates incl. inactive |
| POST | `/api/rates` | Add new rate |
| PUT | `/api/rates/{id}` | Update rate price |
| DELETE | `/api/rates/{id}` | Delete rate |
| GET | `/api/contact` | All contact messages |
| PATCH | `/api/contact/{id}/read` | Mark message as read |
| GET | `/api/reviews/all` | All reviews |
| PATCH | `/api/reviews/{id}/publish` | Toggle review visibility |

---

## 🔐 Admin Panel

URL: `/admin`  
Default login: `admin` / `Admin@123`

**Change credentials** in `.env`:
```env
ADMIN_USERNAME=yourname
ADMIN_PASSWORD=YourStrongPassword!
```

Admin features:
- 📊 Dashboard with booking stats
- 📅 Manage all bookings (update status, delete)
- 💰 Edit scrap rates live
- 📨 Read/delete contact messages
- ⭐ Publish/unpublish customer reviews

---

## 🌐 Production Deployment

### Environment variables to change for production:
```env
SECRET_KEY=<generate with: python -c "import secrets; print(secrets.token_hex(32))">
ADMIN_PASSWORD=<strong password>
DATABASE_URL=postgresql://user:pass@your-db-host:5432/kabadimarket
```

### Deploy options:
| Service | Cost | Notes |
|---|---|---|
| **Railway** | Free tier | Push repo → auto deploy backend + DB |
| **Render** | Free tier | Similar to Railway |
| **DigitalOcean App Platform** | ~$12/mo | Reliable, managed |
| **VPS (DigitalOcean/AWS)** | ~$6/mo | Use docker-compose |
| **Vercel** | Free | Frontend only; backend on Railway |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Python 3.11, FastAPI 0.111, SQLAlchemy 2.0 |
| **Auth** | JWT (python-jose), Passlib bcrypt |
| **Database** | PostgreSQL 16 |
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS 3 |
| **State** | TanStack Query (React Query) |
| **Forms** | React Hook Form |
| **HTTP** | Axios |
| **Routing** | React Router DOM v6 |
| **Toasts** | React Hot Toast |
| **Container** | Docker, Docker Compose, Nginx |

---

## 📁 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, calculator, stats, process, reviews, FAQ |
| Services | `/services` | 6 service cards with details |
| Rate List | `/rates` | Live rate table + category filter + calculator |
| Booking | `/booking` | Pickup scheduling form |
| About | `/about` | Company story, team, impact |
| Contact | `/contact` | Contact form + info |
| Admin Login | `/admin/login` | JWT login |
| Admin Dashboard | `/admin` | Stats overview |
| Admin Bookings | `/admin/bookings` | Manage bookings |
| Admin Rates | `/admin/rates` | Edit scrap prices |
| Admin Messages | `/admin/messages` | Contact messages |
| Admin Reviews | `/admin/reviews` | Publish/hide reviews |

---

## 📜 License

MIT — free to use and modify.
