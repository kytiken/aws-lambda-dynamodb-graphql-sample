import { APIGatewayProxyHandler } from "aws-lambda";
import { graphql } from "graphql";
import schema from "./src/graphql/schema";

const rootValue = "";
const contextValue = "";
const operationName = "";

const execute_graphql = async (query, variableValues) => {
  return await graphql(
    schema,
    query,
    rootValue,
    contextValue,
    variableValues,
    operationName
  )
    .then(data => {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
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
  const query = event.queryStringParameters.query;
  const variableValues = event.queryStringParameters.variables;
  return await execute_graphql(query, variableValues);
};

export const graphql_post_method_handler: APIGatewayProxyHandler = async (
  event,
  context
) => {
  const body = JSON.parse(event.body);
  const query = body.query;
  const variableValues = body.variables;
  return await execute_graphql(query, variableValues);
};
