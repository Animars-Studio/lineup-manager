import { GroupType } from "@aws-sdk/client-cognito-identity-provider";
import { CognitoGroup } from "./generated/graphql";

export const convertToGraphqlResult = (result: string) => {
  return { result };
};

export const convertToGraphqlError = (error: unknown) => {
  return { error: { message: error as string } };
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
