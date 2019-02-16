import DynamoDBUpdateParams from "../../base/dynamodb/inputParams/DynamoDBUpdateParams";

export default class PostUpdateParams extends DynamoDBUpdateParams {
  title: string;
  contents: string;

  constructor(id: string, title: string, contents: string) {
    super();
    this.id = id;
    this.title = title;
    this.contents = contents;
  }

  setUpdateAttributeList() {
    this.updateAttributeList = ["title", "contents"];
  }
}
