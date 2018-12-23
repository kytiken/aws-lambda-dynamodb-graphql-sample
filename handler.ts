import { APIGatewayProxyHandler } from "aws-lambda";
import { graphql } from "graphql";
import schema from "./schema";

export const graphql_handler: APIGatewayProxyHandler = async (
  event,
  context
) => {
  return await graphql(schema, event.queryStringParameters.query)
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
