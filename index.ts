import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDatabase } from "./config/connectDB";
import { ApolloServer, gql } from "apollo-server-express";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolver";


const startServer = async () => {
  connectDatabase();

  const app: Express = express();
  const port: number = 3000;
  
  // Graphql
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app: app,
    path: "/graphql"
  })

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

startServer();