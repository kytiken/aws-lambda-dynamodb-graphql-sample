import DynamoDBUpdateParams from "./DynamoDBUpdateParams";

class HelloDynamoDBUpdateParams extends DynamoDBUpdateParams {
  foo: string;
  bar: string;

  constructor(id: string, foo: string, bar: string) {
    super();
    this.id = id;
    this.foo = foo;
    this.bar = bar;
  }

  setUpdateAttributeList() {
    this.updateAttributeList = ["id", "foo", "bar"];
  }
}

describe("DynamoDBUpdateParams", () => {
  describe("expression", () => {
    test("basic", () => {
      const params = new HelloDynamoDBUpdateParams("a", "b", "c");

      expect(params.expression()).toBe("set  id = :id, foo = :foo, bar = :bar");
    });
  });

  describe("expressionAttributeValues", () => {
    test("basic", () => {
      const params = new HelloDynamoDBUpdateParams("a", "b", "c");
      const subject = params.expressionAttributeValues();
      expect(subject[":id"]).toBe("a");
      expect(subject[":foo"]).toBe("b");
      expect(subject[":bar"]).toBe("c");
    });
  });
});
