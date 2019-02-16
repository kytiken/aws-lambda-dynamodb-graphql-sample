import DynamoDBDeleteParams from "../../base/dynamodb/inputParams/DynamoDBDeleteParams";

export default class PostDeleteParams extends DynamoDBDeleteParams {
  id: string;

  constructor(id) {
    super();
    this.id = id;
  }
}
