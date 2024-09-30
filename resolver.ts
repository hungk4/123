import { Query } from "mongoose";

export const resolvers = {
  Query: {
    hello: () => {
      return "hello world";
    }
  }
};