import CreateParams from "./inputParams/CreateParams";
import UpdateParams from "./inputParams/UpdateParams";
import DeleteParams from "./inputParams/DeleteParams";

export default interface ProviderInterface {
  findBy(id: string): Promise<Object>;
  all(): Promise<Object>;
  create(params: CreateParams): Promise<Object>;
  update(params: UpdateParams): Promise<Object>;
  delete(params: DeleteParams): Promise<Object>;
}
