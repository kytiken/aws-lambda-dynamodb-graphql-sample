import Provider from "./ProviderInterface";
import CreateParams from "./inputParams/CreateParams";
import UpdateParams from "./inputParams/UpdateParams";
import DeleteParams from "./inputParams/DeleteParams";

export default class Repository {
  provider: Provider;
  tableName: string;

  constructor(tableName: string, provider: Provider) {
    this.provider = provider;
    this.tableName = tableName;
  }

  findBy(id: string): Promise<any> {
    return this.provider.findBy(id);
  }

  all(): Promise<any> {
    return this.provider.all();
  }

  create(params: CreateParams): Promise<any> {
    return this.provider.create(params);
  }

  update(params: UpdateParams): Promise<any> {
    return this.provider.update(params);
  }

  delete(params: DeleteParams): Promise<any> {
    return this.provider.delete(params);
  }
}
