# --- Dependencies ---
FROM node:20-alpine AS deps
WORKDIR /app

# Copy root and backend package.json
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

# Install deps (include devDependencies for build)
RUN npm install --workspace=apps/backend

# --- Build stage ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build NestJS
RUN npm run build --workspace=apps/backend

# --- Production runtime ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only build output + production deps
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/package*.json ./apps/backend/
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3001

CMD ["npm", "run", "start:prod", "--workspace=apps/backend"]
