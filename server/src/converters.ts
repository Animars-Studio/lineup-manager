export const convertToGraphqlResult = (result: string) => {
  return { result };
};

export const convertToGraphqlError = (error: unknown) => {
  return { error: { message: error as string } };
};
