import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchemaConfig
} from "graphql";
import { DynamoDB } from "aws-sdk";
import { v4 as uuid } from "uuid";
const dynamoDb = new DynamoDB.DocumentClient();

const postType = new GraphQLObjectType({
  name: "Post",
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    contents: { type: GraphQLString }
  }
});

const QueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: postType,
      resolve: () => {
        return {
          id: "hgeowjfoiwej",
          title: "hoge",
          contents: "fuga"
        };
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
        const newId = uuid();
        const itemParams = {
          id: newId,
          title,
          contents
        };
        const putParams: DynamoDB.DocumentClient.PutItemInput = {
          TableName: process.env.DYNAMODB_TABLE,
          Item: itemParams
        };
        return await dynamoDb
          .put(putParams)
          .promise()
          .then(data => {
            console.log(itemParams);
            return itemParams;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
});

const config: GraphQLSchemaConfig = {
  query: QueryType,
  mutation: MutationType
};

export default new GraphQLSchema(config);
