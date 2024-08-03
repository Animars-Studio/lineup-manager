// Load env variables
import { config } from "dotenv";
config();

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
