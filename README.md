# Webenablix

Web accessibility compliance platform built with **Node.js + Express + PostgreSQL** (backend) and **React + Vite + Tailwind CSS** (frontend). Converted from FastAPI + MongoDB + React CRA.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js 18+, Express 4, PostgreSQL 15 |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Scanner | axios + cheerio |
| Frontend | React 18, Vite 5 |
| UI | Tailwind CSS 3.4, shadcn/ui, Radix UI |

---

## Project Structure

```
Webenablix/
├── backend/              # Express API server
│   ├── db/               # pg Pool + migrations
│   ├── middleware/        # JWT auth middleware
│   ├── routes/           # auth, audit, leads, contact, status
│   ├── services/         # scanner, auditService
│   ├── server.js         # Entry point
│   └── .env.example
├── frontend/             # React Vite app
│   ├── src/
│   │   ├── components/   # Shared UI components + shadcn/ui
│   │   ├── pages/        # Route-level page components
│   │   ├── data/         # Static data / navigation
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities (cn, etc.)
│   └── .env.example
└── docker-compose.yml
```

---

## Local Development

### Prerequisites

- Node.js 18+
- PostgreSQL 15+ (or Docker)

### 1. Database Setup

```bash
# Option A: Use Docker for just the database
docker-compose up postgres -d

# Option B: Create the database manually
psql -U postgres
CREATE DATABASE webenablix;
CREATE USER webenablix_user WITH ENCRYPTED PASSWORD 'webenablix_pass';
GRANT ALL PRIVILEGES ON DATABASE webenablix TO webenablix_user;
\q
```

### 2. Backend

```bash
cd backend
npm install

# Copy and configure env vars
cp .env.example .env
# Edit .env with your DB credentials and JWT secret

# Run database migrations (creates all tables)
node db/migrate.js

# Start development server (port 8001)
npm run dev
```

Backend env vars (`.env`):

```
PORT=8001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=webenablix
DB_USER=webenablix_user
DB_PASSWORD=webenablix_pass
JWT_SECRET=your_long_random_secret_here
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend

```bash
cd frontend
npm install

# Copy and configure env vars
cp .env.example .env.local
# Edit VITE_BACKEND_URL if backend runs on a different port

# Start development server (port 3000)
npm run dev
```

Frontend env vars (`.env.local`):

```
VITE_BACKEND_URL=http://localhost:8001
```

---

## Docker (Full Stack)

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up --build -d

# Stop
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v
```

Services:
- **PostgreSQL** — `localhost:5432`
- **Backend API** — `http://localhost:8001`
- **Frontend** — `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/auth/me` | Yes | Get current user |
| POST | `/api/audit` | Optional | Run accessibility audit |
| GET | `/api/audits` | Yes | List user's audits |
| GET | `/api/audits/:id` | Yes | Get single audit |
| GET | `/api/audits/stats/summary` | Yes | Audit statistics |
| POST | `/api/leads` | No | Submit lead form |
| POST | `/api/contact` | No | Submit contact form |
| GET | `/api/status` | No | API health status |
| GET | `/health` | No | Health check |

---

## Scripts

### Backend

```bash
npm run dev      # nodemon watch mode
npm start        # production
```

### Frontend

```bash
npm run dev      # Vite dev server with HMR
npm run build    # Production build → dist/
npm run preview  # Preview production build
npm run lint     # ESLint
```

---

## Deployment Notes

- Set `NODE_ENV=production` on the backend server
- Run `node db/migrate.js` once after provisioning the database
- Build the frontend with `npm run build` and serve the `dist/` directory from a CDN or static host
- Set `VITE_BACKEND_URL` to your production API URL **at build time**
- Use a strong random `JWT_SECRET` (minimum 32 characters)
