declare module "amazon-cognito-identity-js" {
  export class CognitoUserPool {
    constructor(data: { UserPoolId: string; ClientId: string });
    signUp(
      username: string,
      password: string,
      userAttributes: CognitoUserAttribute[],
      validationData: any,
      callback: (err: any, result: any) => void
    ): void;
  }

  export class CognitoUser {
    constructor(data: { Username: string; Pool: CognitoUserPool });
    authenticateUser(
      authenticationDetails: AuthenticationDetails,
      callbacks: {
        onSuccess: (result: any) => void;
        onFailure: (err: any) => void;
      }
    ): void;
  }

  export class CognitoUserAttribute {
    constructor(data: { Name: string; Value: string });
  }

  export class AuthenticationDetails {
    constructor(data: { Username: string; Password: string });
  }
}
