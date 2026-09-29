import { test } from "node:test";
import assert from "node:assert/strict";
import { shout } from "../src/shout.js";

test("shout upper-cases the text and appends an exclamation mark", () => {
  assert.equal(shout("hello"), "HELLO!");
});
