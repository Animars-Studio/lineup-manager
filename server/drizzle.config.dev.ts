import { defineConfig } from "drizzle-kit";
import { awsRdsConfig } from "./src/drizzle/db-rds";

if (!process.env.DB_PASSWORD) {
  throw new Error(
    "Please provide a database password in the DB_PASSWORD environment variable"
  );
}

console.log("Running migrations in AWS RDS environment", awsRdsConfig);

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle",
  dbCredentials: awsRdsConfig as any,
});
