import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

import {
  CognitoIdentityProviderClient,
  GroupType,
  ListGroupsCommand,
} from "@aws-sdk/client-cognito-identity-provider";

export type CognitoServiceSignUpArgs = {
  email: string;
  password: string;
};

export type CognitoServiceLoginArgs = {
  username: string;
  password: string;
};

export type CognitoServiceConfirmSignupArgs = {
  username: string;
  code: string;
};

export type CognitoServiceResendConfirmationCodeArgs = {
  username: string;
};

export class CognitoService {
  private static instance: CognitoService;
  private userPool: CognitoUserPool;
  private identityProvider: CognitoIdentityProviderClient;

  private constructor() {
    if (
      !process.env.COGNITO_USER_POOL_ID ||
      !process.env.COGNITO_USER_POOL_CLIENT_ID
    ) {
      throw new Error("Cognito user pool ID and client ID are required");
    }
    const poolData = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
    };
    this.userPool = new CognitoUserPool(poolData);
    this.identityProvider = new CognitoIdentityProviderClient({
      region: process.env.COGNITO_REGION,
    });
  }

  public static getInstance(): CognitoService {
    if (!CognitoService.instance) {
      CognitoService.instance = new CognitoService();
    }
    return CognitoService.instance;
  }

  public async login({
    username,
    password,
  }: CognitoServiceLoginArgs): Promise<string> {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result.getIdToken().getJwtToken());
        },
        onFailure: (err) => {
          console.log("[login] error:", err);
          reject(err.message || JSON.stringify(err));
        },
      });
    });
  }

  public async signup({
    email,
    password,
  }: CognitoServiceSignUpArgs): Promise<string> {
    let attributeList: CognitoUserAttribute[] = [];
    const emailAttribute = new CognitoUserAttribute({
      Name: "email",
      Value: email,
    });

    const convertedUsername = email.replace(/@/g, "-");

    const usernameAttribute = new CognitoUserAttribute({
      Name: "custom:assuming_username",
      Value: convertedUsername,
    });

    attributeList = [emailAttribute, usernameAttribute];

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        convertedUsername,
        password,
        attributeList,
        [],
        (err, result) => {
          if (err) {
            console.log("[signup] error:", err);
            reject(err.message || JSON.stringify(err));
          }
          resolve(result?.user.getUsername() as string);
        }
      );
    });
  }

  public async confirmSignup({
    username,
    code,
  }: CognitoServiceConfirmSignupArgs): Promise<string> {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.log("[confirmSignup] error:", err);
          reject(err.message || JSON.stringify(err));
          return;
        }
        resolve(result);
      });
    });
  }

  public async resendConfirmationCode({
    username,
  }: CognitoServiceResendConfirmationCodeArgs): Promise<string> {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          reject(err.message || JSON.stringify(err));
          return;
        }
        console.log("[resendConfirmationCode] Confirmation code resent", result);
        resolve("Confirmation code resent");
      });
    });
  }

  public async listGroups(): Promise<GroupType[]> {
    const command = new ListGroupsCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
    });
    try {
      const response = await this.identityProvider.send(command);
      return response.Groups ?? [];
    } catch (error) {
      console.error("[listGroups] error:", error);
      throw new Error(JSON.stringify(error));
    }
  }
}
