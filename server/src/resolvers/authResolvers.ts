import {
  MutationLoginArgs,
  MutationSignupArgs,
  MutationConfirmSignupArgs,
  MutationResendConfirmationCodeArgs,
  CustomGraphQlResult,
  CognitoGroup,
  ListGroupsResult,
} from "../generated/graphql";
import { CognitoService } from "../services/cognitoService";
import {
  convertListGroupsToGraphqlResult,
  convertToGraphqlError,
  convertToGraphqlResult,
} from "../converters";

export class AuthResolvers {
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

  listGroups = async (): Promise<ListGroupsResult> => {
    return this.cognito
      .listGroups()
      .then(convertListGroupsToGraphqlResult)
      .catch(convertToGraphqlError);
  };
}
