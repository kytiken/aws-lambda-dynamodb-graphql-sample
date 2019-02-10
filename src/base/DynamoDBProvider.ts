import { DynamoDB } from "aws-sdk";
import Provider from "./Provider";
import CreateParams from "./inputParams/CreateParams";
import UpdateParams from "./inputParams/UpdateParams";
import DeleteParams from "./inputParams/DeleteParams";

export default class DynamoDBProvider extends Provider {
  dynamoDb: DynamoDB.DocumentClient;
  tableName: string;

  constructor(tableName: string) {
    super();
    this.dynamoDb = new DynamoDB.DocumentClient();
    this.tableName = tableName;
  }

  findBy(id: string): Promise<any> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: { id }
    };
    return this.dynamoDb.get(params).promise();
  }

  all(): Promise<any> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName
    };
    return this.dynamoDb.scan(params).promise();
  }

  create(createParams: CreateParams): Promise<any> {
    createParams.setNewId();
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: createParams
    };
    return this.dynamoDb.put(params).promise();
  }

  update(updateParams: UpdateParams): Promise<any> {
    const attributesExpression = updateParams.updateAttributeList
      .map(attrName => {
        return ` ${attrName} = :${attrName}`;
      })
      .join(",");
    const updateExpression = `set ${attributesExpression}`;
    let expressionAttributeValues = {};
    updateParams.updateAttributeList.forEach(attrName => {
      expressionAttributeValues[`:${attrName}`] = updateParams[attrName];
    });
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: { id: updateParams.id },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues
    };
    return this.dynamoDb.update(params).promise();
  }

  delete(deleteParams: DeleteParams): Promise<any> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: { id: deleteParams.id }
    };
    return this.dynamoDb.delete(params).promise();
  }
}
