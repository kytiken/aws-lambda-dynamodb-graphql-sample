import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchemaConfig,
  GraphQLList
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

const postListType = new GraphQLList(postType);

const QueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: postType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: async (_, { id }) => {
        const params: DynamoDB.DocumentClient.GetItemInput = {
          TableName: process.env.DYNAMODB_TABLE,
          Key: { id }
        };
        return await dynamoDb
          .get(params)
          .promise()
          .then(data => {
            return data.Item;
          });
      }
    },
    posts: {
      type: postListType,
      resolve: async () => {
        const scanParams: DynamoDB.DocumentClient.ScanInput = {
          TableName: process.env.DYNAMODB_TABLE
        };

        return await dynamoDb
          .scan(scanParams)
          .promise()
          .then(data => {
            return data.Items;
          });
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
          .then(() => {
            return itemParams;
          })
          .catch(err => {
            console.log(err);
          });
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
        const params: DynamoDB.DocumentClient.UpdateItemInput = {
          TableName: process.env.DYNAMODB_TABLE,
          Key: { id },
          UpdateExpression: "set title = :title, contents = :contents",
          ExpressionAttributeValues: {
            ":title": title,
            ":contents": contents
          }
        };
        return await dynamoDb
          .update(params)
          .promise()
          .then(data => {
            return {
              id
            };
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
