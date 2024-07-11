import { ApolloClient, InMemoryCache } from "@apollo/client";

export class ApolloClientService {
    private static instance: ApolloClient<any>;

    constructor() { }

    static getInstance(serverUri?:string) {
        console.log('ApolloClientService url: ', serverUri)

        if (!ApolloClientService.instance && !serverUri) {
            throw new Error('Must provide initial uri for Apollo Server')
        }

        if (ApolloClientService.instance) {
            return this.instance;
        }
        this.instance = new ApolloClient({
            uri: serverUri,
            cache: new InMemoryCache(),
        });
        return this.instance;
    }
}