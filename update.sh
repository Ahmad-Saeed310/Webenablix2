#!/bin/bash
# ── Webenablix — Live Update Script ──────────────────────────────────────────
# Run this on your server (ahmadsaeed.me) to pull and redeploy the latest code.
# Usage:  bash update.sh

set -e

echo "==> Pulling latest code..."
git pull origin main

echo "==> Rebuilding and restarting containers (zero-downtime rolling update)..."
docker compose up --build -d

echo "==> Cleaning up unused Docker images..."
docker image prune -f

echo "==> Container status:"
docker compose ps

echo ""
echo "✅  Update complete! Site is live at https://ahmadsaeed.me"
