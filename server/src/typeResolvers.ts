export const typeResolvers = {
  UserResult: {
    __resolveType(obj: any) {
      if ("id" in obj) {
        return "User";
      }
      if ("error" in obj) {
        return "CustomError";
      }
      return null;
    },
  },
};
