from node:20-alpine as dependencies
workdir /app
copy package*.json ./
run npm ci

from node:20-alpine as builder
workdir /app
copy --from=dependencies /app/node_modules ./node_modules
copy . .
run npm run build

from node:20-alpine as runner
workdir /app
env NODE_ENV=production
env PORT=8003

copy --from=builder /app/node_modules ./node_modules
copy --from=builder /app/dist ./dist
expose 8003
cmd ["node","dist/index.js"]

healthcheck --interval=30s --timeout=5s --start-period=10s --retries=3 cmd wget --no-verbose --tries=1 --spider http://localhost:8003/health || exit 1