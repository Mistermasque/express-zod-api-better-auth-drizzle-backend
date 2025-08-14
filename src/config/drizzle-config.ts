import { defineConfig } from "drizzle-kit";
import { dbConfig } from "./db-config";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/tables/*-table.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: dbConfig.url,
  },
});
