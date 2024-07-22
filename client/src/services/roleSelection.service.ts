import { gql } from "@apollo/client";
import { ApolloClientService } from "./apolloClient.service";
import { ISelectRole } from "../pages/RoleSelection/RoleSelection";

export interface IRoleResponse {
    roles: ISelectRole[];
  }
  
export interface ISetRoleResult{
    result: string
}
  //Get role group
const RoleSelectionQueryDoc = gql`
  query GetRoles {
    cognitoGroups {
    ... on CognitoGroupsResult {
      groups {
        name
        description
      }
    }
  }
}
`;
 
//Set user role group
const SetRoleGroupMutationDoc = gql`
  mutation SetRoleGroup($username: String!, $groupName: String!) {
  addUserToGroup(username: $username, groupName: $groupName) {
    ... on GenericResult {
      result
    }
    ... on CustomError {
      error {
        message
      }
    }
  }
}
`;


export class RoleSelectionService {
  constructor() {}

  private apolloClient = ApolloClientService.getInstance();

  async GetRoleGroup(): Promise<IRoleResponse> {
    try {
      const result = await this.apolloClient.query({
        query:RoleSelectionQueryDoc
      })

      const data = result.data;

      return {
        roles: data.cognitoGroups.groups,
      };

    } catch (error) {
      throw new Error("Error fetching roles");
    }
  }

  /*NOT TESTED YET*/
  async SetRoleGroup(roleForm:ISelectRole):Promise<ISetRoleResult> {
    try {
        const result = await this.apolloClient.mutate({
            mutation: SetRoleGroupMutationDoc,
            variables: roleForm,
          });
          console.log("Set role group mutation: ", result);

          const data = result.data;
    
          if (data.signup.error) {
            throw new Error(data.signup.error.message);
          }
          return {
            result: data.signup.username,
          };
    } catch (error) {
        throw new Error("Error while setting role");
    }
  }
}
