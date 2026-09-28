import { test } from "node:test";
import assert from "node:assert/strict";
import { farewell } from "../src/farewell.js";

test("farewell names the caller", () => {
  assert.equal(farewell("world"), "Goodbye, world!");
});
