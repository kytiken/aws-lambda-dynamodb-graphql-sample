import { APIGatewayProxyHandler } from "aws-lambda";
import { graphql } from "graphql";
import schema from "./schema";

const execute_graphql = async query => {
  return await graphql(schema, query)
    .then(data => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          data
        })
      };
    })
    .catch(err => {
      return {
        statusCode: 420,
        body: JSON.stringify({
          error: err
        })
      };
    });
};

export const graphql_get_method_handler: APIGatewayProxyHandler = async (
  event,
  context
) => {
  return await execute_graphql(event.queryStringParameters.query);
};

export const graphql_post_method_handler: APIGatewayProxyHandler = async (
  event,
  context
) => {
  const query = JSON.parse(event.body).query;
  return await execute_graphql(query);
};
