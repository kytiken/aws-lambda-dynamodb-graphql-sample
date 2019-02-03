import UpdateParams from "../../base/inputParams/UpdateParams";

export default class PostUpdateParams extends UpdateParams {
  title: string;
  contents: string;

  constructor(id: string, title: string, contents: string) {
    super();
    this.id = id;
    this.title = title;
    this.contents = contents;
  }

  setUpdateAttributeList() {
    this.updateAttributeList = ["id", "title", "contents"];
  }
}
