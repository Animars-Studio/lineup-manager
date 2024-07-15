import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { ApolloClientService } from "./services/apolloClient.service";

const graphQlApiUrl = "http://localhost:3000";
export const client = ApolloClientService.getInstance(graphQlApiUrl);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App client={client} />
    </ApolloProvider>
  </React.StrictMode>
);
