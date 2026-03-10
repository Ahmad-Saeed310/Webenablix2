# Webenablix — Docker Deployment Guide

This guide walks you through deploying the full stack (Frontend + Backend + PostgreSQL) using Docker Compose, both locally and on a production server.

---

## Prerequisites

Make sure the following are installed on your machine (or your server):

| Tool | Minimum Version | Check |
|------|----------------|-------|
| Docker | 24+ | `docker --version` |
| Docker Compose | 2.20+ (V2) | `docker compose version` |
| Git | any | `git --version` |

> On Windows, Docker Desktop includes both Docker and Docker Compose.

---

## Step 1 — Get the Code

```bash
git clone <your-repo-url>
cd Webenablix
```

If you already have the folder, just make sure you are in the project root (where `docker-compose.yml` lives).

---

## Step 2 — Configure Secrets (Required for Production)

Open `docker-compose.yml` and change the following values before going live:

```yaml
# ── PostgreSQL ──────────────────────────────────────
POSTGRES_PASSWORD: <strong-unique-password>

# ── Backend ─────────────────────────────────────────
DATABASE_URL: postgresql://webenablix_user:<strong-unique-password>@postgres:5432/webenablix
JWT_SECRET: <64-char-random-string>          # see generator below
ADMIN_PASSWORD: <strong-admin-password>
FRONTEND_URL: https://yourdomain.com         # your real domain
```

**Generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

> For local testing the defaults in `docker-compose.yml` are fine to use as-is.

---

## Step 3 — Build and Start All Services

```bash
docker compose up --build -d
```

What this does:
- Builds the **frontend** (React/Vite → Nginx)
- Builds the **backend** (Node.js)
- Starts **PostgreSQL 15** with a persistent volume
- Runs database migrations automatically on first boot
- Starts all three containers in the background (`-d`)

---

## Step 4 — Verify Everything is Running

```bash
docker compose ps
```

Expected output — all three services should show **running**:

```
NAME                    STATUS          PORTS
webenablix_db           running         0.0.0.0:5432->5432/tcp
webenablix_backend      running         0.0.0.0:8001->8001/tcp
webenablix_frontend     running         0.0.0.0:3000->80/tcp
```

---

## Step 5 — Open the App

| Service | URL |
|---------|-----|
| Frontend (React app) | http://localhost:3000 |
| Backend API | http://localhost:8001 |
| Admin Panel | http://localhost:3000/admin |

**Default admin credentials:**
- Username: `admin`
- Password: `admin@webenablix`

> Change the admin password immediately after first login, or update `ADMIN_PASSWORD` in `docker-compose.yml` before starting.

---

## Step 6 — Check Logs (if something is wrong)

```bash
# All services at once
docker compose logs -f

# Individual services
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres
```

---

## Deploying on a Production VPS (DigitalOcean, AWS EC2, etc.)

### 1. Install Docker on the server (Ubuntu / Debian)

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Log out and back in, then verify:
docker --version
docker compose version
```

### 2. Transfer the project to the server

Option A — Clone directly from Git:
```bash
git clone <your-repo-url>
cd Webenablix
```

Option B — Copy from your local machine with `scp`:
```bash
scp -r ./Webenablix user@your-server-ip:/home/user/Webenablix
```

### 3. Update environment variables

Edit `docker-compose.yml` on the server with production values (see Step 2 above), especially:
- `POSTGRES_PASSWORD`
- `JWT_SECRET`
- `ADMIN_PASSWORD`
- `FRONTEND_URL` → your real domain

### 4. Start the stack

```bash
cd Webenablix
docker compose up --build -d
```

### 5. Point your domain to the server

Set an **A record** in your DNS provider pointing your domain to the server's public IP address.

### 6. Add SSL with Nginx reverse proxy (recommended)

Install Nginx and Certbot on the server:
```bash
sudo apt install nginx certbot python3-certbot-nginx -y
```

Create `/etc/nginx/sites-available/webenablix`:
```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and obtain SSL:
```bash
sudo ln -s /etc/nginx/sites-available/webenablix /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Common Docker Commands

| Task | Command |
|------|---------|
| Start all services | `docker compose up -d` |
| Start and rebuild | `docker compose up --build -d` |
| Stop all services | `docker compose down` |
| Stop and delete volumes | `docker compose down -v` |
| View running containers | `docker compose ps` |
| Stream all logs | `docker compose logs -f` |
| Restart one service | `docker compose restart backend` |
| Rebuild one service | `docker compose up --build -d backend` |

---

## Database Management

### Backup the database
```bash
docker exec webenablix_db pg_dump -U webenablix_user webenablix > backup-$(date +%Y%m%d).sql
```

### Restore from a backup
```bash
cat backup.sql | docker exec -i webenablix_db psql -U webenablix_user webenablix
```

### Open a database shell
```bash
docker compose exec postgres psql -U webenablix_user -d webenablix
```

---

## Updating the App

When you pull new code and need to redeploy:

```bash
git pull
docker compose up --build -d
```

Docker will only rebuild containers that changed. The database volume is preserved.

---

## Troubleshooting

### Backend shows "database connection refused"
The backend starts before the DB is fully ready. Wait 10–15 seconds and restart:
```bash
docker compose restart backend
```

### Frontend shows a blank page
```bash
docker compose logs frontend
docker compose up --build -d frontend
```

### API calls return 504 Gateway Timeout
```bash
docker compose ps               # check all services are "running"
docker compose logs backend     # look for errors
docker compose exec frontend ping backend   # verify network
```

### Port already in use
Edit `docker-compose.yml` and change the host-side port (left side of `:`):
```yaml
ports:
  - "3001:80"    # Use 3001 instead of 3000 if 3000 is taken
```

---

## Architecture

```
Your Browser
     │
     ▼  :3000
┌─────────────┐      /api/*
│  Frontend   │──────────────▶ ┌─────────────┐      ┌────────────┐
│  (Nginx)    │                │   Backend   │─────▶│ PostgreSQL │
│             │                │  (Node.js)  │      │   :5432    │
└─────────────┘                └─────────────┘      └────────────┘
                  webenablix-network (bridge)
```

All three containers communicate over an internal Docker bridge network. Only ports 3000, 8001, and 5432 are exposed to the host.
