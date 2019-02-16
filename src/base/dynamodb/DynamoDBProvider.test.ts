import DynamoDBProvider from "./DynamoDBProvider";
import { DynamoDB } from "aws-sdk";

const provider = new DynamoDBProvider("hello");
describe("DynamoDBProvider", () => {
  describe("constructor", () => {
    test("set dynamoDb client", () => {
      expect(provider.dynamoDb).toBeInstanceOf(DynamoDB.DocumentClient);
    });

    test("set tableName", () => {
      expect(provider.tableName).toBe("hello");
    });
  });
});
