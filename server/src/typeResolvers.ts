export const typeResolvers = {
  CustomGraphQlResult: {
    __resolveType(obj: Record<string, unknown>) {
      if ("error" in obj) {
        return "CustomError";
      }
      if ("result" in obj) {
        return "GenericResult";
      }
      return null;
    },
  },
  SignupResult: {
    __resolveType(obj: Record<string, unknown>) {
      if ("id" in obj) {
        return "User";
      }
      if ("error" in obj) {
        return "CustomError";
      }
      return null;
    },
  },
  CognitoGroupsUnion: {
    __resolveType(obj: Record<string, unknown>) {
      if ("groups" in obj) {
        return "CognitoGroupsResult";
      }
      if ("error" in obj) {
        return "CustomError";
      }
      return null;
    },
  },
};
