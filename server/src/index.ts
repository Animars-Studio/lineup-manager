/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";

import { Resolvers } from "./generated/graphql";
import { readFileSync } from "fs";
import { join } from "path";

import { GraphQLResolveInfo } from "graphql";

import { AuthResolver } from "./resolvers/auth.resolver";

import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import serverlessExpress from "@codegenie/serverless-express";

import { typeResolvers } from "./typeResolvers";
import { AuthFeature } from "./features/auth.feature";
import { TeamResolver } from "./resolvers/team.resolver";
import { TeamFeature } from "./features/team.feature";
import { graphqlUploadExpress } from "graphql-upload-minimal";

type ParentType = {};
type ContextType = {};

export type ResolverParams<T> = {
  parent: ParentType;
  args: T;
  context: ContextType;
  info: GraphQLResolveInfo;
};

const typeDefs = readFileSync(join(__dirname, "schema.graphql"), "utf8");
const authResolver = new AuthResolver();
const authFeature = AuthFeature.getInstance();

const teamResolver = new TeamResolver();
const teamFeature = TeamFeature.getInstance();

const resolvers: Resolvers = {
  ...typeResolvers,
  Query: {
    cognitoGroups: async (parent, args, context, info) => {
      return authResolver.listGroups();
    },
  },
  Mutation: {
    login: async (parent, args, context, info) => {
      return authResolver.login(args);
    },
    signup: async (parent, args, context, info) => {
      return authFeature.signup(args);
    },
    confirmSignup: async (parent, args, context, info) => {
      return authResolver.confirmSignup(args);
    },
    resendConfirmationCode: async (parent, args, context, info) => {
      return authResolver.resendConfirmationCode(args);
    },
    userGroups: async (parent, args, context, info) => {
      return authResolver.listGroupsForUser(args);
    },
    addUserToGroup: async (parent, args, context, info) => {
      return authResolver.addUserToGroup(args);
    },
    createTeam: async (parent, args, context, info) => {
      return await teamFeature.createTeam(args);
    },
  },
};

export interface Context {}

// const server = new ApolloServer<Context>({
//   typeDefs,
//   resolvers,
//   csrfPrevention: true,
// });

// const app = express();
// app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

// export const graphqlHandler = startServerAndCreateLambdaHandler(
//   server,
//   handlers.createAPIGatewayProxyEventV2RequestHandler(),
//   app as any
// );

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

let serverlessExpressInstance: any;

async function setup(event: any, context: any) {
  await server.start();
  app.use(
    "/",
    cors(),
    bodyParser.json({ limit: "50mb" }),
    graphqlUploadExpress({ maxFileSize: 50000000, maxFiles: 10 }),
    expressMiddleware(server, {
      context: async () => {
        /* Your context function */
      },
    } as any)
  );
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

exports.handler = (event: any, context: any) => {
  if (serverlessExpressInstance)
    return serverlessExpressInstance(event, context);

  return setup(event, context);
};
