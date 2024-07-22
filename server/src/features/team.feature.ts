import {
  MutationCreateTeamArgs,
  Team,
  TeamResult,
  User,
} from "../generated/graphql";
import { TeamService } from "../services/team.service";
import { UserService } from "../services/user.service";

import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

export type FileUpload = {
  fieldName: string;
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadStream;
};

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
  private s3Client: S3Client;

  constructor() {
    this.userService = UserService.getInstance();
    this.teamService = TeamService.getInstance();
    this.s3Client = new S3Client({ region: process.env.COGNITO_REGION });
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

    // cast args.file to FileUpload
    if (!args.file) {
      return { error: { message: "Logo is required" } };
    }

    const { file } = args.file as { file: FileUpload };

    console.log("[createTeam] file:", file);

    // upload logo to s3
    let logoUrl = "";
    const { createReadStream, filename, mimetype, encoding } = await file;
    const stream = createReadStream();

    const key = `uploads/${uuidv4()}-${filename}`;
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: stream,
      ContentType: mimetype,
      ContentEncoding: encoding,
    };

    try {
      const upload = new Upload({
        client: this.s3Client,
        params: params,
      });
      await upload.done();
      logoUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
    } catch (error) {
      console.error("[uploadImage] error:", error);
      throw new Error(`Failed to upload image. ${JSON.stringify(error)}`);
    }

    // create team
    const team = await this.teamService.createTeam<Team>({
      ...args,
      logoUrl,
    });
    // assign team to user
    await this.userService.updateUser<User>(args.userId, {
      teamId: team.id,
    });
    return team;
  }
}
