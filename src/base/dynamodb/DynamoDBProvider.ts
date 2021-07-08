import { DynamoDB } from "aws-sdk";
import ProviderInterface from "../ProviderInterface";
import DynamoDbCreateParams from "./inputParams/DynamoDbCreateParams";
import DynamoDbUpdateParams from "./inputParams/DynamoDbUpdateParams";
import DynamoDbDeleteParams from "./inputParams/DynamoDbDeleteParams";

export default class DynamoDBProvider implements ProviderInterface {
  dynamoDb: DynamoDB.DocumentClient;
  tableName: string;

  constructor(tableName: string) {
    this.dynamoDb = new DynamoDB.DocumentClient();
    this.tableName = tableName;
  }

  findBy(id: string): Promise<any> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: { id }
    };
    return this.dynamoDb
      .get(params)
      .promise()
      .then(data => {
        return data.Item;
      });
  }

  all(): Promise<any> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName
    };
    return this.dynamoDb
      .scan(params)
      .promise()
      .then(data => {
        return data.Items;
      });
  }

  create(createParams: DynamoDbCreateParams): Promise<any> {
    createParams.setNewId();
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: createParams
    };
    return this.dynamoDb.put(params).promise();
  }

  update(updateParams: DynamoDbUpdateParams): Promise<any> {
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: { id: updateParams.id },
      UpdateExpression: updateParams.expression(),
      ExpressionAttributeValues: updateParams.expressionAttributeValues()
    };
    return this.dynamoDb.update(params).promise();
  }

  delete(deleteParams: DynamoDbDeleteParams): Promise<any> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: { id: deleteParams.id }
    };
    return this.dynamoDb.delete(params).promise();
  }
}
