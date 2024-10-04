import { gql } from "apollo-server-express";

export const typeDefsUser = gql `
  type User {
    id: String,
    fullName: String,
    email: String,
    token: String,
    code: Int,
    message: String
  }

  input UserInput {
    fullName: String,
    email: String,
    password: String
  }
  type Query {
    getUser(token: String): User
  }

  type Mutation {
    register(user: UserInput): User,
    login(user: UserInput): User
  }
`