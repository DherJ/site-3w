# ---------- BUILD ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- RUN ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# ✅ CRITIQUE : copie la config runtime
COPY --from=builder /app/next.config.* ./ 

RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm", "start"]
