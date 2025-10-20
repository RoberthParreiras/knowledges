import { defineConfig } from "prisma/config";

export default defineConfig({
  migrations: {
    seed: "dotenv -e .env.local -- tsx src/common/lib/prisma/seed.ts",
  },
});
