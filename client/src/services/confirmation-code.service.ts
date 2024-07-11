import { gql } from "@apollo/client";
import {  IConfirmationCodeResponse, VerifyCodeArgs } from "../pages/Authentication/Confirmation-code/Confirmation-Code.interface";
import { ApolloClientService } from "./apolloClient.service";
import { code } from "ionicons/icons";

const ConfirmSignUpMutationDoc = gql`
  mutation ConfirmSignup($username: String!, $code: String!) {
    confirmSignup(username: $username, code: $code)
  }`

export class ConfirmationCodeService {

    constructor() { }

    //Getting Apollo service instance
    private CLIENT = ApolloClientService.getInstance()

    async verifyCode({
        username,
        code
    }: VerifyCodeArgs): Promise<IConfirmationCodeResponse | null> {
        try {
            const result = await this.CLIENT.mutate({
                mutation: ConfirmSignUpMutationDoc,
                variables: {
                    username,
                    code
                },
            })

            console.log('Verification Code mutation: ', result)

            const data = result.data

            if (data.confirmSignup.error) {
                throw new Error(data.confirmSignup.error.message);
            }

            return {
                message: data.confirmSignup
            };
        } catch (error) {
            console.log('Error confirmation code Service >>>> ', error)
            throw new Error('Error while verifying code')
        }
    }
}