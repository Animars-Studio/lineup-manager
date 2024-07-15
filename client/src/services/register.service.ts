import { gql } from "@apollo/client";
import { ApolloClientService } from "./apolloClient.service";
import {
  IRegister,
  RegisterResponse,
} from "../pages/Authentication/Register/Register";

const SignUpMutationDoc = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      ... on User {
        id
        email
        username
        isConfirmed
        createdAt
        updatedAt
      }
      ... on CustomError {
        error {
          message
        }
      }
    }
  }
`;

export class RegisterService {
  constructor() {}

  private apolloClient = ApolloClientService.getInstance();

  async CreateAdmin(registerForm: IRegister): Promise<RegisterResponse | null> {
    try {
      const result = await this.apolloClient.mutate({
        mutation: SignUpMutationDoc,
        variables: registerForm,
      });

      console.log("CreateAdmin mutation: ", result);

      const data = result.data;

      if (data.signup.error) {
        throw new Error(data.signup.error.message);
      }

      return {
        id: data.signup.id,
        username: data.signup.username,
      };
    } catch (error) {
      throw new Error("Error while creating admin");
    }
  }
}
