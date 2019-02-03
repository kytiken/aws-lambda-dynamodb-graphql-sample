import CreateParams from "../../base/inputParams/CreateParams";

export default class PostCreateParams extends CreateParams {
  title: String;
  contents: String;

  constructor(title: String, content: String) {
    super();
    this.title = title;
    this.contents = content;
  }
}
