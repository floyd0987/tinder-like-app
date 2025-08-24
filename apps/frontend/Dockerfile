# --- Stage 1: Build Next.js Application ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copy necessary package.json files and the Next.js config file
COPY package.json ./
COPY apps/frontend/package*.json ./apps/frontend/
COPY apps/frontend/next.config.ts ./apps/frontend/next.config.ts

# Install dependencies
RUN npm install --workspace=apps/frontend

# Copy source code and build the application
COPY . .
RUN npm run build --workspace=apps/frontend

# --- Stage 2: Production Runtime ---
FROM node:20-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy the root package.json for npm install
COPY --from=builder /app/package.json ./

# Copy only production dependencies
COPY --from=builder /app/apps/frontend/package*.json ./apps/frontend/
RUN npm install --workspace=apps/frontend --production

# Copy the built application and other necessary files from the builder stage
COPY --from=builder /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder /app/apps/frontend/public ./apps/frontend/.next/static/
COPY --from=builder /app/apps/frontend/next.config.ts ./apps/frontend/next.config.ts

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start", "--workspace=apps/frontend"]