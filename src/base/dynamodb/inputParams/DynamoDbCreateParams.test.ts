import DynamoDbCreateParams from "./DynamoDBCreateParams";

describe("CreateParams", () => {
  describe("setNewId", () => {
    test("basic", () => {
      expect(new DynamoDbCreateParams().id).not.toBe(
        new DynamoDbCreateParams().id
      );
    });
  });
});
