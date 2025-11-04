# Use Node.js 20 official image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Copy source code
COPY . .

# Install dependencies
RUN pnpm install --frozen-lockfile=false

# Build application
RUN pnpm build

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Start application
CMD ["pnpm", "start"]
