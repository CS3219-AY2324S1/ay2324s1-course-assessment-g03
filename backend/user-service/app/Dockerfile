# Use NodeJS server for the app
FROM node:18-alpine AS builder
WORKDIR /app
# Install dependencies first, as they change less often than code.
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine as server
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev
COPY --from=builder ./app/dist ./dist
EXPOSE 80
RUN chmod +x migrate-and-start.sh
CMD ["./migrate-and-start.sh"]