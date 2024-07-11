import { defineConfig } from "drizzle-kit";
import { dbConfig } from "./src/drizzle/db";

// Load env variables
import { config } from "dotenv";
config();

if (!process.env.RDS_PASSWORD) {
  throw new Error(
    "Please provide a database password in the DB_PASSWORD environment variable"
  );
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle",
  dbCredentials: dbConfig,
});
