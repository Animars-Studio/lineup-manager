import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../drizzle/schema";
import { PgTable, TableConfig } from "drizzle-orm/pg-core";
import postgres from "postgres";
import { dbConfig } from "../drizzle/db";
import { awsRdsConfig } from "../drizzle/db-rds";
import { eq } from "drizzle-orm";

import { config } from "dotenv";
config();

export class BaseDrizzleOrm {
  constructor() {}

  public async insert<T>(entity: PgTable<TableConfig>, values: T[]) {
    const db = DbInstance.getInstance() as PostgresJsDatabase<typeof schema>;
    return db.insert(entity).values(values).returning().execute() as Promise<
      T[]
    >;
  }

  public async update<T>(
    id: string,
    entity: PgTable<TableConfig>,
    values: Partial<T>
  ) {
    const db = DbInstance.getInstance() as PostgresJsDatabase<typeof schema>;
    return db
      .update(entity)
      .set(values)
      .where(eq((entity as any).id, id))
      .returning()
      .execute() as Promise<T>;
  }
}

export class DbInstance {
  private static instance: DbInstance;
  private constructor() {
    const databaseConfig =
      process.env.AM_IS_OFFLINE === "true" ? dbConfig : awsRdsConfig;
    const dbClient = postgres(databaseConfig);
    console.log("[BaseDrizzleOrm] Database config: ", databaseConfig);
    return drizzle(dbClient, { schema });
  }

  public static getInstance() {
    if (!DbInstance.instance) {
      DbInstance.instance = new DbInstance();
    }
    return DbInstance.instance;
  }
}
