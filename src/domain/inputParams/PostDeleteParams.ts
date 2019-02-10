import DeleteParams from "../../base/inputParams/DeleteParams";

export default class PostDeleteParams extends DeleteParams {
  id: string;

  constructor(id) {
    super();
    this.id = id;
  }
}
