import { v4 as uuid } from "uuid";

export default class CreateParams extends Object {
  id: String;

  setNewId() {
    const newId = uuid();
    this.id = newId;
  }
}
