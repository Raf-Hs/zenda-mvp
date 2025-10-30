import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      // Render exige SSL en conexiones Postgres
      url: process.env.DATABASE_URL + "?sslmode=require",
    },
  },
});
