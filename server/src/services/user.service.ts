import { usersTable } from "../drizzle/schema";
import { BaseDrizzleOrm } from "../orm";
import { convertInsertArgs } from "./helpers";

type CreateUserArgs = {
  email: string;
  password: string;
  username: string;
  isConfirmed?: boolean;
};

export class UserService {
  private static instance: UserService;
  private orm: BaseDrizzleOrm;

  constructor() {
    this.orm = new BaseDrizzleOrm();
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async getUser<T>(id: string): Promise<T> {
    try {
      const row = await this.orm.getById<T>(id, usersTable);
      return row;
    } catch (error) {
      console.log("[UserService] get user error: ", error);
      throw new Error("Error getting user");
    }
  }

  public async createUser<T>(args: CreateUserArgs): Promise<T> {
    try {
      const rows = await this.orm.insert<typeof usersTable.$inferInsert>(
        usersTable,
        [convertInsertArgs(args)]
      );
      const [row] = rows;
      return row as T;
    } catch (error) {
      console.log("[UserService] create user error: ", error);
      throw new Error("Error creating user");
    }
  }

  public async updateUser<T>(id: string, values: Partial<T>): Promise<T> {
    try {
      const row = await this.orm.update<T>(id, usersTable, values);
      return row;
    } catch (error) {
      console.log("[UserService] update user error: ", error);
      throw new Error("Error updating user");
    }
  }
}
