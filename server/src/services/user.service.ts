import { SQLWrapper } from "drizzle-orm";
import { userTeamsTable, usersTable } from "../drizzle/schema";
import { BaseDrizzleOrm } from "../orm";
import { convertInsertArgs } from "./helpers";

type CreateUserArgs = {
  email: string;
  password: string;
  username: string;
  isConfirmed?: boolean;
};

export type UserTeamRole = "ADMIN" | "COACH" | "PLAYER";

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

  public async getAdminOfTeam<T>(teamId: string): Promise<T> {
    try {
      const db = await this.orm.getDb();
      const admin = await db.query.userTeamsTable.findFirst({
        where: (userTeams, { eq }) => eq(userTeams.teamId, teamId) && eq(userTeams.role, "ADMIN"),
        with: {
          user: true,
        },
      })
      console.log("[UserService] get admin of team: ", admin);
      return admin as T;
    } catch (error) {
      console.log("[UserService] get admin of team error: ", error);
      throw new Error("Error getting admin of team");
    }
  }

  public async assignUserToTeam<T>(
    userId: string,
    teamId: string,
    role: UserTeamRole
  ): Promise<T> {
    try {
      const user = await this.getUser<T>(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const rows = await this.orm.insert<typeof userTeamsTable.$inferInsert>(
        userTeamsTable,
        [{ userId, teamId, role }]
      );
      const [row] = rows;
      return row as T;
    } catch (error) {
      console.log("[UserService] assign user to team error: ", error);
      throw new Error("Error assigning user to team");
    }
  }
}
