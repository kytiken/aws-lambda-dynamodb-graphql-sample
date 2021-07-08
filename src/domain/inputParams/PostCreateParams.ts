import DynamoDBCreateParams from "../../base/dynamodb/inputParams/DynamoDBCreateParams";

export default class PostCreateParams extends DynamoDBCreateParams {
  title: String;
  contents: String;

  constructor(title: String, content: String) {
    super();
    this.title = title;
    this.contents = content;
  }
}
