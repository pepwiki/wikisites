# Multi-stage build for wikisites (Astro + Cloudflare)
# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache python3 make g++ vips-dev
RUN corepack enable
WORKDIR /app
COPY package.json bun.lock ./
COPY packages/shared/package.json packages/shared/
COPY packages/query/package.json packages/query/
COPY packages/workers/package.json packages/workers/
COPY packages/encp/package.json packages/encp/
COPY packages/wiki/package.json packages/wiki/
RUN bun install --frozen-lockfile

# Stage 2: Build
FROM node:20-alpine AS build
RUN apk add --no-cache python3 make g++ vips-dev
RUN corepack enable
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/*/node_modules ./packages/*/node_modules
COPY . .
RUN bun run build:encp && bun run build:wiki

# Stage 3: Production
FROM node:20-alpine AS production
RUN addgroup -g 1001 -S wikisites && adduser -S wikisites -u 1001
WORKDIR /app
COPY --from=build --chown=wikisites:wikisites /app/packages/encp/dist ./dist/encp
COPY --from=build --chown=wikisites:wikisites /app/packages/wiki/dist ./dist/wiki
RUN npm install -g serve
USER wikisites
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1
CMD ["serve", "dist", "-l", "3000"]
