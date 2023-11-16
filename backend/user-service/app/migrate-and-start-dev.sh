#!/bin/sh

dotenv -e .env.development -- npx prisma generate
npm run dev