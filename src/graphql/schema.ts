import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchemaConfig
} from "graphql";
import postType from "./types/PostType";
import postListType from "./types/PostListType";
import PostRepository from "../domain/repositories/PostRepository";
import DynamoDBProvider from "../base/dynamodb/DynamoDBProvider";
import PostCreateParams from "../domain/inputParams/PostCreateParams";
import PostUpdateParams from "../domain/inputParams/PostUpdateParams";
import PostDeleteParams from "../domain/inputParams/PostDeleteParams";

const provider = new DynamoDBProvider(process.env.DYNAMODB_TABLE);
const postRepository = new PostRepository(process.env.DYNAMODB_TABLE, provider);

const QueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: postType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: async (_, { id }) => {
        return await postRepository.findBy(id);
      }
    },
    posts: {
      type: postListType,
      resolve: async () => {
        return await postRepository.all();
      }
    }
  }
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createPost: {
      type: postType,
      args: {
        title: { type: GraphQLString },
        contents: { type: GraphQLString }
      },
      resolve: async (source, { title, contents }) => {
        const postCreateParams = new PostCreateParams(title, contents);
        return await postRepository.create(postCreateParams);
      }
    },
    updatePost: {
      type: postType,
      args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        contents: { type: GraphQLString }
      },
      resolve: async (source, { id, title, contents }) => {
        const postUpdateParams = new PostUpdateParams(id, title, contents);
        return await postRepository.update(postUpdateParams);
      }
    },
    deletePost: {
      type: postType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: async (source, { id }) => {
        const postDeleteParams = new PostDeleteParams(id);
        return await postRepository.delete(postDeleteParams);
      }
    }
  }
});

const config: GraphQLSchemaConfig = {
  query: QueryType,
  mutation: MutationType
};

export default new GraphQLSchema(config);
