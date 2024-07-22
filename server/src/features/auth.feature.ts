import { MutationSignupArgs, SignupResult, User } from "../generated/graphql";
import { AuthResolver } from "../resolvers/auth.resolver";
import { UserService } from "../services/user.service";

/**
 * This pattern involves creating an "orchestrator" or "facade" type classes
 * that manages the flow of operations across multiple services.
 * These classes are responsible for coordinating between different service
 * components to complete a business transaction or feature.
 */
export class AuthFeature {
  private static instance: AuthFeature;
  private authResolvers: AuthResolver;
  private userService: UserService;

  constructor() {
    this.authResolvers = new AuthResolver();
    this.userService = UserService.getInstance();
  }

  public static getInstance(): AuthFeature {
    if (!AuthFeature.instance) {
      AuthFeature.instance = new AuthFeature();
    }
    return AuthFeature.instance;
  }

  public async signup(args: MutationSignupArgs): Promise<SignupResult> {
    let result: SignupResult = {};
    const signupResult = await this.authResolvers.signup(args);
    if ("error" in signupResult) {
      result = {
        error: { message: signupResult.error?.message as string },
      };
    }
    if ("result" in signupResult) {
      result = await this.userService.createUser<User>({
        ...args,
        isConfirmed: false,
        username: signupResult.result as string,
      });
    }
    return result;
  }
}
