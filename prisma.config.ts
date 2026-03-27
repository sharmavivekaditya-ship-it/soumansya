import "dotenv/config";
import { defineConfig } from "prisma/config";

const fallbackDatabaseUrl = "file:./dev.db";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "node prisma/seed.mjs",
  },
  datasource: {
    url:
      process.env.DIRECT_URL ||
      process.env.DATABASE_URL ||
      fallbackDatabaseUrl,
  },
});
