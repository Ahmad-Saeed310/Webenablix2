# Webenablix

Web accessibility compliance platform — **Node.js + Express + PostgreSQL** backend, **React + Vite + Tailwind CSS** frontend.

---

## 🚀 Quick Start

### Local Development

1. **Prerequisites:** Node.js 20+, PostgreSQL 15+

2. **Backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env - set DATABASE_URL to your local Postgres
   node db/migrate.js
   npm run dev
   ```

3. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open http://localhost:3000

---

## 🌐 Deploy to Production (Free!)

**📖 See [DEPLOYMENT.md](DEPLOYMENT.md) for complete beginner-friendly step-by-step guide**

Uses:
- **Netlify** (Frontend) — Free tier: 100GB bandwidth/month
- **Render** (Backend) — Free tier: 750 hours/month  
- **Supabase** (Database) — Free tier: 500MB database

Total setup time: ~20 minutes. Zero deployment experience needed.

---

## 🐳 Docker (Alternative)

```bash
docker-compose up --build -d
```

Services at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8001
- PostgreSQL: localhost:5432

---

## 📁 Stack

| Component | Technology |
|-----------|-----------|
| Backend | Node.js 20, Express, PostgreSQL 15 |
| Auth | JWT, bcrypt, Google OAuth |
| Scanner | axios + cheerio |
| Frontend | React 18, Vite 5, Tailwind CSS 3.4 |
| UI | Radix UI, shadcn/ui |

---

## 🔧 Environment Variables

### Backend (`.env`)
```
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=long_random_secret_min_32_chars
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change_this
FRONTEND_URL=http://localhost:3000
```

### Frontend (`.env.local`)
```
VITE_BACKEND_URL=              # Empty in dev (Vite proxy)
VITE_GOOGLE_CLIENT_ID=...     # Optional
```

---

## 🎯 Key Features

- **Accessibility Audits** — WCAG 2.2 compliance scanning
- **SEO Analysis** — Meta tags, structured data, mobile-friendliness  
- **Admin Dashboard** — User management, audit logs, blog CMS
- **Blog System** — Full CRUD for accessibility articles
- **User Authentication** — Email/password + Google OAuth
- **Dashboard** — Personal audit history and stats

---

## 📚 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Sign up |
| POST | `/api/auth/login` | — | Login |
| POST | `/api/auth/admin` | — | Admin login |
| GET | `/api/auth/me` | JWT | Current user |
| POST | `/api/audit` | Optional | Run audit |
| GET | `/api/audits` | JWT | List audits |
| GET | `/api/blogs` | — | Blog posts |
| GET | `/api/admin/blogs` | Admin | Manage blogs |
| GET | `/api/admin/users` | Admin | Manage users |
| GET | `/health` | — | Health check |

---

## 👤 Admin Panel

1. Navigate to `/login`
2. Click **Admin** tab
3. Default credentials:
   - Username: `admin`
   - Password: `admin@webenablix`

**⚠️ Change these in production via environment variables!**

---

## 📄 License

MIT
