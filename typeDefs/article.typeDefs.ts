import { gql } from "apollo-server-express";

export const typeDefsAticle = gql`
  type Article {
    id: String,
    title: String,
    avatar: String,
    description: String
    categoryId: String,
    category: Category
  }

  type Message {
    code: Int,
    message: String
  }
  
  type Query {
    getListArticle: [Article],
    getArticle(id: String): Article,
  }
  
  input ArticleInput {
    title: String, 
    avatar: String,
    description: String,
    categoryId: String
  }

  type Mutation {
    createArticle(article: ArticleInput): Article,
    deleteArticle(id: String): Message,
    updateArticle(id: String, article: ArticleInput): Article
  }
`;