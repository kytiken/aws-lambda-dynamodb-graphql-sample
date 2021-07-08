import { v4 as uuid } from "uuid";
import CreateParams from "../../inputParams/CreateParams";

export default class DynamoDbCreateParams implements CreateParams {
  id: String;

  constructor() {
    this.setNewId();
  }

  setNewId() {
    const newId = uuid();
    this.id = newId;
  }
}
