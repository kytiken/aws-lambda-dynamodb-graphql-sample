import UpdateParams from "../../inputParams/UpdateParams";

export default class DynamoDbUpdateParams extends UpdateParams {
  constructor() {
    super();
    this.setUpdateAttributeList();
  }

  setUpdateAttributeList() {
    this.updateAttributeList = ["id"];
  }

  expression() {
    const attributesExpression = this.updateAttributeList
      .map(attrName => {
        return ` ${attrName} = :${attrName}`;
      })
      .join(",");
    return `set ${attributesExpression}`;
  }

  expressionAttributeValues() {
    let expressionAttributeValues = {};
    this.updateAttributeList.forEach(attrName => {
      expressionAttributeValues[`:${attrName}`] = this[attrName];
    });
    return expressionAttributeValues;
  }
}
