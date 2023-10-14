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
ARG DATABASE_URL
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Required as Prisma requires a .env file to load the database URL
RUN touch .env
RUN echo 'DATABASE_URL=${DATABASE_URL}' > .env

COPY --from=builder ./app/dist ./dist

COPY migrate-and-start.sh ./
COPY ./prisma ./prisma

RUN chmod +rwx migrate-and-start.sh

EXPOSE 80

CMD ["./migrate-and-start.sh"]