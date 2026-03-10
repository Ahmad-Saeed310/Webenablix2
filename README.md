# Webenablix

Web accessibility compliance platform — **Node.js + Express + PostgreSQL** backend, **React + Vite + Tailwind CSS** frontend.

---

## 🎯 Getting Started Fast

### Option 1: Docker (Recommended for Quick Setup)

**Prerequisites:** Docker Desktop installed

```bash
# Clone and start everything in one command
git clone <your-repo-url>
cd webenablix
docker-compose up --build -d
```

**Access:** http://localhost:3000 (Frontend automatically connects to backend)

### Option 2: Local Development

**Prerequisites:** Node.js 20+, PostgreSQL 15+

```bash
# Backend
cd backend
npm install
cp .env.example .env
# Edit .env - set DATABASE_URL to your local Postgres
node db/migrate.js
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

**Access:** http://localhost:3000

---

## 🚀 Detailed Setup Guides

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
- **Netlify or Vercel** (Frontend) — Free tier: 100GB bandwidth/month
- **Railway** (Backend - Recommended) — Free: $5 credit/month (~500 hours, no sleep)
- **Render** (Backend - Alternative) — Free: 750 hours/month (sleeps after 15min)
- **Supabase** (Database) — Free tier: 500MB database

Total setup time: ~20 minutes. Zero deployment experience needed.

---

## 🐳 Docker Deployment

### Prerequisites
- Docker Desktop (Windows/macOS) or Docker Engine (Linux)
- Docker Compose V2 (included with Docker Desktop)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/webenablix.git
   cd webenablix
   ```

2. **Configure environment variables (optional):**
   
   The docker-compose.yml includes default values for quick testing. For production:
   
   - Set `JWT_SECRET` to a strong random string
   - Set `ADMIN_USERNAME` and `ADMIN_PASSWORD`
   - Add your `GOOGLE_CLIENT_ID` if using OAuth
   
   Edit the `docker-compose.yml` environment section or create a `.env` file:
   ```bash
   # .env file in project root
   GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   ```

3. **Build and start all services:**
   ```bash
   docker-compose up --build -d
   ```

4. **Access the application:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:8001
   - **Database:** localhost:5432

### Docker Commands

```bash
# Start services (detached mode)
docker-compose up -d

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes (clears database)
docker-compose down -v

# Rebuild after code changes
docker-compose up --build

# Check service status
docker-compose ps
```

### Architecture

The Docker setup includes three services:

1. **PostgreSQL** (`postgres`) - Port 5432
   - Official PostgreSQL 15 Alpine image
   - Persistent data in Docker volume `postgres_data`
   - Health check enabled

2. **Backend** (`backend`) - Port 8001
   - Multi-stage Node.js build
   - Auto-runs database migrations on startup
   - Depends on healthy PostgreSQL

3. **Frontend** (`frontend`) - Port 3000
   - Multi-stage build: Node.js → Nginx
   - Vite build with environment variables
   - Nginx proxies `/api/*` to backend
   - SPA routing support

### Production Deployment

For production deployment with Docker:

1. **Update security settings in `docker-compose.yml`:**
   ```yaml
   environment:
     JWT_SECRET: your_production_secret_min_64_chars
     ADMIN_PASSWORD: strong_admin_password
     FRONTEND_URL: https://yourdomain.com
   ```

2. **Enable HTTPS** (recommended):
   - Add reverse proxy (Nginx/Traefik) with SSL certificates
   - Or use cloud load balancer with SSL termination

3. **Database backups:**
   ```bash
   # Backup database
   docker-compose exec postgres pg_dump -U webenablix_user webenablix > backup.sql
   
   # Restore database
   cat backup.sql | docker-compose exec -T postgres psql -U webenablix_user webenablix
   ```

4. **Resource limits** (add to docker-compose.yml):
   ```yaml
   backend:
     deploy:
       resources:
         limits:
           cpus: '1'
           memory: 512M
   ```

### Troubleshooting

**Database connection errors:**
```bash
# Check if database is ready
docker-compose logs postgres

# Restart backend after database is ready
docker-compose restart backend
```

**Build errors:**
```bash
# Clean rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

**View backend errors:**
```bash
docker-compose logs backend
```

**Access database directly:**
```bash
docker-compose exec postgres psql -U webenablix_user -d webenablix
```

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
