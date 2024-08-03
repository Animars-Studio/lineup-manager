import { v4 as uuidv4 } from "uuid";
import { teamsTable } from "../drizzle/schema";
import { Team } from "../generated/graphql";
import { BaseDrizzleOrm } from "../orm";
import { convertInsertArgs } from "./helpers";

export type TeamArgs = Omit<Team, "id">;

export class TeamService {
  private static instance: TeamService;
  private orm: BaseDrizzleOrm;

  constructor() {
    this.orm = new BaseDrizzleOrm();
  }

  public static getInstance(): TeamService {
    if (!TeamService.instance) {
      TeamService.instance = new TeamService();
    }
    return TeamService.instance;
  }

  public async getTeam<T>(id: string): Promise<T> {
    try {
      const row = await this.orm.getById<T>(id, teamsTable);
      return row;
    } catch (error) {
      console.log("[TeamService] get team error: ", error);
      throw new Error("Error getting team by id");
    }
  }

  public async createTeam<T>(args: TeamArgs): Promise<T> {
    try {
      const rows = await this.orm.insert<typeof teamsTable.$inferInsert>(
        teamsTable,
        [convertInsertArgs(args)]
      );
      const [row] = rows;
      return row as T;
    } catch (error) {
      console.log("[TeamService] create team error: ", error);
      throw new Error("Error creating team");
    }
  }

  public async updateTeam<T>(id: string, values: Partial<T>): Promise<T> {
    try {
      const row = await this.orm.update<T>(id, teamsTable, values);
      return row;
    } catch (error) {
      console.log("[TeamService] update team error: ", error);
      throw new Error("Error updating team");
    }
  }
}
