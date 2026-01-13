import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "dotenv -e .env.local -- tsx src/common/lib/prisma/seed.ts",
  }, 
  datasource: {
    url: env("DATABASE_URL"),
  },
});
