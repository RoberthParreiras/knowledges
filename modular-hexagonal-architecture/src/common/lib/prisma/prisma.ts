import { PrismaClient } from "../src/common/lib/prisma/generated";

const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL },
  },
});

export default prisma;
