# --- Base deps ---
FROM node:20-alpine AS deps
WORKDIR /app

# Copy root and frontend package.json/yarn.lock
COPY package*.json ./
COPY apps/frontend/package*.json ./apps/frontend/

# Install deps (include devDependencies for build)
RUN npm install --workspace=apps/frontend

# --- Build stage ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js
RUN npm run build --workspace=apps/frontend

# --- Production runtime ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only built frontend
COPY --from=builder /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder /app/apps/frontend/package*.json ./apps/frontend/
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public

EXPOSE 3000

# Run Next.js
CMD ["npm", "run", "start", "--workspace=apps/frontend"]
