import {
  MutationCreateTeamArgs,
  Team,
  TeamResult,
  User,
} from "../generated/graphql";
import { FileUpload, S3ClientService } from "../services/s3.service";
import { TeamService } from "../services/team.service";
import { UserService, UserTeamRole } from "../services/user.service";

/**
 * This pattern involves creating an "orchestrator" or "facade" type classes
 * that manages the flow of operations across multiple services.
 * These classes are responsible for coordinating between different service
 * components to complete a business transaction or feature.
 */
export class TeamFeature {
  private static instance: TeamFeature;
  private userService: UserService;
  private teamService: TeamService;
  private s3ClientService: S3ClientService;

  constructor() {
    this.userService = UserService.getInstance();
    this.teamService = TeamService.getInstance();
    this.s3ClientService = S3ClientService.getInstance();
  }

  public static getInstance(): TeamFeature {
    if (!TeamFeature.instance) {
      TeamFeature.instance = new TeamFeature();
    }
    return TeamFeature.instance;
  }

  public async createTeam(args: MutationCreateTeamArgs): Promise<TeamResult> {
    // check if user exists
    const user = await this.userService.getUser<User>(args.userId);
    if (!user) {
      return { error: { message: "User not found" } };
    }

    if (!args.file) {
      return { error: { message: "Logo is required" } };
    }

    const { file } = args.file as { file: FileUpload };

    // upload logo to s3
    const logoUrl = await this.s3ClientService.uploadImage(file);

    // create team
    const team = await this.teamService.createTeam<Team>({
      ...args,
      logoUrl,
    });

    // assign team to user
    await this.userService.assignUserToTeam<User>(
      args.userId,
      team.id,
      "ADMIN"
    );
    return team;
  }

  public async addPlayerToTeam(
    userId: string,
    teamId: string,
    invitedBy: string,
    role: UserTeamRole
  ): Promise<TeamResult> {
    // check if user exists
    const user = await this.userService.getUser<User>(userId);
    if (!user) {
      return { error: { message: "User not found" } };
    }

    // check if team exists
    const team = await this.teamService.getTeam<Team>(teamId);
    if (!team) {
      return { error: { message: "Team not found" } };
    }

    // get the invitedBy user
    const invitedByUser = await this.userService.getUser<User>(invitedBy);
    if (!invitedByUser) {
      return { error: { message: "Invited by user not found" } };
    }

    // check if the team has an ADMIN and the invitedBy matches the ADMIN
    const teamAdmin = await this.userService.getAdminOfTeam<User>(teamId);
    if (!teamAdmin || teamAdmin.id !== invitedBy) {
      return { error: { message: "Unauthorized" } };
    }

    // assign user to team
    const assignedTeam = await this.userService.assignUserToTeam<User>(
      userId,
      teamId,
      role
    );
    return team;
  }
}
