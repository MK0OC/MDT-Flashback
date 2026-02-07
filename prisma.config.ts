import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import path from "node:path";

export default defineConfig({
  // ← point to the folder
  schema: path.join("prisma", "schema"),

  // migrations folder stays next to that
  migrations: {
    path: "prisma/schema/migrations",
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
});
