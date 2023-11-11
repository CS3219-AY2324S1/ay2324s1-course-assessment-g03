#!/bin/sh

dotenv -e .env.development -- npx prisma db push
npm run dev