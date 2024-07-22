import { v4 as uuidv4 } from "uuid";
export const convertInsertArgs = <T>(args: Record<string, unknown>): T => {
  return {
    ...args,
    id: uuidv4(),
  } as T;
};
