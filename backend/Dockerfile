# ── Stage 1: production image ────────────────────────────────────────────────
FROM node:20-alpine

# Install OS-level dependencies needed by some npm packages (e.g. canvas, bcrypt)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Install dependencies first (layer-cache friendly)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 8001

# Run migrations then start server
CMD ["sh", "-c", "node db/migrate.js && node server.js"]
