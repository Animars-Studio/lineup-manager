import { gql } from "@apollo/client";
import { ApolloClientService } from "./apolloClient.service";
import { ILogin, LoginResponse } from "../pages/Authentication/Login/Login";

const LoginMutationDoc = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export class LoginService {
  constructor() {}

  private apolloClient = ApolloClientService.getInstance();

  async adminVerification(
    loginInitialForm: ILogin
  ): Promise<LoginResponse | null> {
    try {
      const result = await this.apolloClient.mutate({
        mutation: LoginMutationDoc,
        variables: loginInitialForm,
      });

      console.log("AdminVerification mutation: ", result);

      const data = result.data;

      if (data.login.error) {
        throw new Error(data.login.error.message);
      }

      return {
        message: data.login,
      };
    } catch (error) {
      console.log("Error Login Service >>>> ", error);
      throw new Error("Error while verifying admin");
    }
  }
}
