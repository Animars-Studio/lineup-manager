import {
  MutationLoginArgs,
  MutationSignupArgs,
  MutationConfirmSignupArgs,
  MutationResendConfirmationCodeArgs,
} from "../generated/graphql";
import { CognitoService } from "../services/cognitoService";

type ResolverResponse = { message: string; error: boolean };

export class AuthResolvers {
  constructor() {}

  login = async (args: MutationLoginArgs): Promise<string> => {
    console.log("[login] mutation called with args:", args);
    const cognito = CognitoService.getInstance();
    const { username, password } = args;
    return cognito.login({ username, password });
  };

  signup = async (args: MutationSignupArgs): Promise<ResolverResponse> => {
    console.log("[signup] mutation called with args:", args);

    const cognito = CognitoService.getInstance();
    let result: ResolverResponse = { message: "", error: false };
    try {
      const { email, password } = args;
      result.message = await cognito.signup({
        email,
        password,
      });
    } catch (error) {
      result = { message: error as string, error: true };
    }
    return result;
  };

  confirmSignup = async (
    args: MutationConfirmSignupArgs
  ): Promise<string | null> => {
    console.log("[confirmSignup] mutation called with args:", args);

    const cognito = CognitoService.getInstance();
    let result;
    try {
      const { code, username } = args;
      result = await cognito.confirmSignup({
        code,
        username,
      });
    } catch (error) {
      console.error("[confirmSignup] error:", result);
    }
    console.log("[confirmSignup] result :", result);
    return result || null;
  };

  resendConfirmationCode = async (
    args: MutationResendConfirmationCodeArgs
  ): Promise<string | null> => {
    console.log("[resendConfirmationCode] mutation called with args:", args);

    const cognito = CognitoService.getInstance();
    let result;
    try {
      const { username } = args;
      result = await cognito.resendConfirmationCode({ username });
    } catch (error) {
      console.error("[resendConfirmationCode] error:", result);
    }
    console.log("[resendConfirmationCode] result :", result);
    return result || null;
  };
}
