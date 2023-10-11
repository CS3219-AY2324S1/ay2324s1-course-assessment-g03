FROM oven/bun

WORKDIR /app

COPY --from=node:18 /usr/local/bin/node /usr/local/bin/node
COPY package.json .
COPY bun.lockb .

RUN bun install
RUN bunx prisma generate

COPY src src
COPY tsconfig.json .
# COPY public public

CMD ["bun", "src/index.ts"]

EXPOSE 80