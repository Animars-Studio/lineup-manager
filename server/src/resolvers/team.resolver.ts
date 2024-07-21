import {
  convertCreateTeamToGraphqlResult,
  convertToGraphqlError,
} from "../converters";
import {
  MutationCreateTeamArgs,
  Team,
  TeamResult,
} from "../generated/graphql";
import { TeamService } from "../services/team.service";

export class TeamResolver {
  teamService: TeamService = TeamService.getInstance();
  constructor() {}

  createTeam = async (
    args: MutationCreateTeamArgs
  ): Promise<TeamResult> => {
    return this.teamService
      .createTeam<Team>(args)
      .then(convertCreateTeamToGraphqlResult)
      .catch(convertToGraphqlError);
  };
}
