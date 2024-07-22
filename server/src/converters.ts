import { GroupType } from "@aws-sdk/client-cognito-identity-provider";
import { Team } from "./generated/graphql";

export const convertToGraphqlResult = (result: string) => {
  return { result };
};

export const convertToGraphqlError = (error: unknown) => {
  return { error: { message: JSON.stringify(error) } };
};

export const convertListGroupsToGraphqlResult = (groups: GroupType[]) => {
  return {
    groups: groups.map((group) => {
      return {
        name: group.GroupName as string,
        description: group.Description as string,
      };
    }),
  };
};

export const convertCreateTeamToGraphqlResult = (
  team: Team
) => {
  return team
};
