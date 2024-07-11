import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";

import { Resolvers } from "./generated/graphql";
import { readFileSync } from "fs";
import { join } from "path";

import { GraphQLResolveInfo } from "graphql";

import { AuthResolvers } from "./resolvers/authResolvers";

import { config } from "dotenv";
config();

import { typeResolvers } from "./typeResolvers";
import { AuthFeature } from "./features/authFeature";
import { UserService } from "./services/userService";

type ParentType = {};
type ContextType = {};

export type ResolverParams<T> = {
  parent: ParentType;
  args: T;
  context: ContextType;
  info: GraphQLResolveInfo;
};

const typeDefs = readFileSync(join(__dirname, "schema.graphql"), "utf8");
const authResolvers = new AuthResolvers();
const authFeature = AuthFeature.getInstance();

const resolvers: Resolvers = {
  ...typeResolvers,
  Query: {
    hello: async (parent, args, context, info) => {
      console.log("hello query called with args:", args, context, info);
      await UserService.getInstance().createUser({
        email: "test@email",
        password: "pass1234",
        username: "testuser",
      });
      return "Hello, World!";
    },
  },
  Mutation: {
    login: async (parent, args, context, info) => {
      return authResolvers.login(args);
    },
    signup: async (parent, args, context, info) => {
      return authFeature.signup(args);
    },
    confirmSignup: async (parent, args, context, info) => {
      return authResolvers.confirmSignup(args);
    },
    resendConfirmationCode: async (parent, args, context, info) => {
      return authResolvers.resendConfirmationCode(args);
    },
  },
};

export interface Context {}

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);
