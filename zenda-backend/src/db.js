import { PrismaClient } from "@prisma/client";

// 🔒 Forzar SSL con Render PostgreSQL
const connectionUrl = process.env.DATABASE_URL.includes("?")
  ? process.env.DATABASE_URL + "&sslmode=require"
  : process.env.DATABASE_URL + "?sslmode=require";

export const prisma = new PrismaClient({
  datasources: {
    db: { url: connectionUrl },
  },
});
