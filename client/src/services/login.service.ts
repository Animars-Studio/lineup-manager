import { gql } from "@apollo/client";
import { ILogin, LoginResponse } from "../pages/Authentication/Login/Login.interface";
import { ApolloClientService } from "./apolloClient.service";

const LoginMutationDoc = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password)
}`

export class LoginService {

    constructor() { }

    //Getting Apollo service instance
  private CLIENT = ApolloClientService.getInstance()

  async adminVerification(loginInitialForm: ILogin): Promise<LoginResponse | null> {

    try {
      const result = await this.CLIENT.mutate({
        mutation: LoginMutationDoc,
        variables: loginInitialForm,
      })

      console.log('AdminVerification mutation: ', result)

      const data = result.data

       if(data.login.error){
        throw new Error (data.login.error.message);
       }

      return {
        message: data.login
      };

    } catch (error) {
      console.log('Error Login Service >>>> ', error)
      throw new Error('Error while verifying admin')
    }
  }
}