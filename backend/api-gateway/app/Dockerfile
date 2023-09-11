# Use NodeJS server for the app
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
# Install dependencies first, as they change less often than code.
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine as server
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev
COPY --from=builder ./usr/src/app/dist ./dist
EXPOSE 8080
CMD ["npm", "run", "start"]