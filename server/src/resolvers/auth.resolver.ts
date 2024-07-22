import {
  MutationLoginArgs,
  MutationSignupArgs,
  MutationConfirmSignupArgs,
  MutationResendConfirmationCodeArgs,
  CustomGraphQlResult,
  CognitoGroupsUnion,
  MutationUserGroupsArgs,
  MutationAddUserToGroupArgs,
} from "../generated/graphql";
import { CognitoService } from "../services/cognito.service";
import {
  convertListGroupsToGraphqlResult,
  convertToGraphqlError,
  convertToGraphqlResult,
} from "../converters";

export class AuthResolver {
  cognito: CognitoService = CognitoService.getInstance();
  constructor() {}

  login = async (args: MutationLoginArgs): Promise<CustomGraphQlResult> => {
    const { username, password } = args;
    return this.cognito
      .login({ username, password })
      .then(convertToGraphqlResult)
      .catch(convertToGraphqlError);
  };

  signup = async (args: MutationSignupArgs): Promise<CustomGraphQlResult> => {
    const { email, password } = args;
    return this.cognito
      .signup({
        email,
        password,
      })
      .then(convertToGraphqlResult)
      .catch(convertToGraphqlError);
  };

  confirmSignup = async (
    args: MutationConfirmSignupArgs
  ): Promise<CustomGraphQlResult> => {
    const { code, username } = args;
    return this.cognito
      .confirmSignup({
        code,
        username,
      })
      .then(convertToGraphqlResult)
      .catch(convertToGraphqlError);
  };

  resendConfirmationCode = async (
    args: MutationResendConfirmationCodeArgs
  ): Promise<CustomGraphQlResult> => {
    const { username } = args;
    return this.cognito
      .resendConfirmationCode({ username })
      .then(convertToGraphqlResult)
      .catch(convertToGraphqlError);
  };

  listGroups = async (): Promise<CognitoGroupsUnion> => {
    return this.cognito
      .listGroups()
      .then(convertListGroupsToGraphqlResult)
      .catch(convertToGraphqlError);
  };

  listGroupsForUser = async ({
    username,
  }: MutationUserGroupsArgs): Promise<CognitoGroupsUnion> => {
    return this.cognito
      .listGroupsByUser(username)
      .then(convertListGroupsToGraphqlResult)
      .catch(convertToGraphqlError);
  };

  addUserToGroup = async ({
    username,
    groupName,
  }: MutationAddUserToGroupArgs): Promise<CustomGraphQlResult> => {
    return this.cognito
      .addUserToGroup({ username, groupName })
      .then(convertToGraphqlResult)
      .catch(convertToGraphqlError);
  };
}
