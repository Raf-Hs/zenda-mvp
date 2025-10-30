import { PrismaClient } from "@prisma/client";

let prisma;

if (!global.prisma) {
  global.prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL + "?connection_limit=1&pool_timeout=10",
      },
    },
  });
}

prisma = global.prisma;

export default prisma;
