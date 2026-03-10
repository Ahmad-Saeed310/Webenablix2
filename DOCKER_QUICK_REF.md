# 🎯 Docker Quick Reference - Webenablix

## ⚡ Quick Start (3 Commands)

```bash
# 1. Clone (if needed)
git clone <your-repo-url> && cd webenablix

# 2. Start everything
docker-compose up --build -d

# 3. Access
open http://localhost:3000
```

## 🔗 Access URLs
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8001  
- **Health Check:** http://localhost:8001/health
- **Database:** localhost:5432

## 🔑 Default Credentials
- **Admin Login:** admin / admin@webenablix
- **Database:** webenablix_user / webenablix_pass

## 📋 Essential Commands

```bash
# Start services
docker-compose up -d

# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker-compose logs -f backend

# Stop services
docker-compose stop

# Stop & remove containers
docker-compose down

# Stop & remove + delete database
docker-compose down -v

# Rebuild after code changes
docker-compose up --build

# Restart specific service
docker-compose restart backend

# Check status
docker-compose ps
```

## 🗄️ Database Commands

```bash
# Access database shell
docker-compose exec postgres psql -U webenablix_user -d webenablix

# Backup database
docker-compose exec postgres pg_dump -U webenablix_user webenablix > backup.sql

# Restore database
cat backup.sql | docker-compose exec -T postgres psql -U webenablix_user webenablix

# View database logs
docker-compose logs postgres
```

## 🐛 Troubleshooting

```bash
# Backend can't connect to DB?
docker-compose restart backend

# Clean rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up

# View container details
docker inspect webenablix_backend

# Execute command in container
docker-compose exec backend node -v
docker-compose exec frontend nginx -t
```

## 🔒 Production Checklist

Edit `docker-compose.yml` before production:

```yaml
environment:
  JWT_SECRET: <64-char-random-string>
  ADMIN_PASSWORD: <strong-password>
  POSTGRES_PASSWORD: <strong-password>
  FRONTEND_URL: https://yourdomain.com
```

Generate secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📂 Project Structure

```
webenablix/
├── docker-compose.yml          # Orchestrates all services
├── .env.example                # Environment variables template
├── DOCKER_DEPLOYMENT.md        # Full Docker guide
├── backend/
│   ├── Dockerfile              # Backend container config
│   ├── .dockerignore           # Files to exclude
│   └── ...
└── frontend/
    ├── Dockerfile              # Frontend multi-stage build
    ├── .dockerignore           # Files to exclude
    ├── nginx.conf              # Nginx configuration
    └── ...
```

## 🎓 Documentation Files

- **[README.md](README.md)** - Main project documentation with Docker quick start
- **[DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md)** - Comprehensive Docker guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Cloud deployment guide (Netlify/Railway/Vercel)
- **This file** - Quick reference card

## 📞 Support

**Check container logs first:**
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
```

**Verify services are running:**
```bash
docker-compose ps
curl http://localhost:8001/health
```

---

💡 **Tip:** Keep this file open while working with Docker!
