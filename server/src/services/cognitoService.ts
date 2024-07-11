import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

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
    console.log("Signing up with attributes:", attributeList);

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        convertedUsername,
        password,
        attributeList,
        [],
        (err, result) => {
          if (err) {
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
        resolve(result);
      });
    });
  }
}
