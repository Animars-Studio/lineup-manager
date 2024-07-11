// Load env variables
import { config } from "dotenv";
config();

console.log("[db-rds.ts] environment: ", {
  DB_USERNAME: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  AM_IS_OFFLINE: process.env.AM_IS_OFFLINE,
});

export const awsRdsConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT || 5432) as number,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
};
