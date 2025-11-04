# Use Node.js 20 official image
FROM node:20-slim

# Install Python and build tools for native dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Copy source code
COPY . .

# Install dependencies and rebuild better-sqlite3
RUN pnpm install --frozen-lockfile=false && \
    pnpm rebuild better-sqlite3 && \
    ls -la node_modules/.pnpm/better-sqlite3*/node_modules/better-sqlite3/build/ || true

# Build application
RUN pnpm build

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Start application
CMD ["pnpm", "start"]
