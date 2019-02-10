import CreateParams from "./inputParams/CreateParams";
import UpdateParams from "./inputParams/UpdateParams";
import DeleteParams from "./inputParams/DeleteParams";

export default abstract class Provider {
  abstract findBy(id: string): Promise<Object>;
  abstract all(): Promise<Object>;
  abstract create(params: CreateParams): Promise<Object>;
  abstract update(params: UpdateParams): Promise<Object>;
  abstract delete(params: DeleteParams): Promise<Object>;
}
