import { v4 as uuid } from "uuid";

export default class DynamoDbCreateParams {
  id: String;

  constructor() {
    this.setNewId();
  }

  setNewId() {
    const newId = uuid();
    this.id = newId;
  }
}
