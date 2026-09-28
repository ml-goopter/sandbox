import { test } from "node:test";
import assert from "node:assert/strict";
import { greet } from "../src/greet.js";

test("greet names the caller", () => {
  assert.equal(greet("world"), "Hello, world!");
});
