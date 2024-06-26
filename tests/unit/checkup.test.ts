import { describe, expect, it } from "vitest";
import testFunction from "../../src/utils";

describe("Check up test", () => {
  describe("#testFunction", () => {
    it("Should return a string as intended", () => {
      const strings = ["🤖", "Hello", "World", "!"];
      const testVar = testFunction(...strings);

      expect(testVar).toBe(strings.join(" "));
    });
  });
});
