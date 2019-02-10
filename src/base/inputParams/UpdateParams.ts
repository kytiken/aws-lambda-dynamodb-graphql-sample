export default abstract class UpdateParams {
  id: string;
  updateAttributeList: Array<string>;

  constructor() {
    this.setUpdateAttributeList();
  }

  abstract setUpdateAttributeList(): void;
}
