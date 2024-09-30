import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Article {
    id: String,
    title: String,
    avatar: String,
    description: String
  }

  type Message {
    code: Int,
    message: String
  }
  
  type Query {
    getListArticle: [Article],
    getArticle(id: String): Article
  }
  
  input ArticleInput {
    title: String, 
    avatar: String,
    description: String
  }

  type Mutation {
    creataArticle(article: ArticleInput): Article,
    deleteArticle(id: String): Message,
    updateArticle(id: String, article: ArticleInput): Article
  }
`;