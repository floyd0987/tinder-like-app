# --- Stage 1: Build and Dependencies ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copy the entire project context
COPY . .

# Install necessary runtime tools
RUN apk add --no-cache bash wget

# Install all dependencies (dev and prod)
RUN npm install

# Change to the backend directory and run a full build
WORKDIR /app/apps/backend
RUN npx prisma generate
RUN npm run build

# --- Stage 2: Production Runtime ---
FROM node:20-alpine AS runner
WORKDIR /app

# Install bash in the final image
RUN apk add --no-cache bash

# Set production environment
ENV NODE_ENV=production


# Copy the entire backend application from the builder stage
COPY --from=builder /app/apps/backend ./apps/backend

# Copy the root node_modules for hoisted dependencies
COPY --from=builder /app/node_modules ./node_modules

# Expose the application port
EXPOSE 3001