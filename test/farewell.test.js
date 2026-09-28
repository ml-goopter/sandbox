import { test } from "node:test";
import assert from "node:assert/strict";
import { farewell } from "../src/farewell.js";

test("farewell names the caller", () => {
  assert.equal(farewell("world"), "Goodbye, world!");
});

test("farewell defaults to English when locale is undefined", () => {
  assert.equal(farewell("world", undefined), "Goodbye, world!");
});

test("farewell in English", () => {
  assert.equal(farewell("world", "en"), "Goodbye, world!");
});

test("farewell in French", () => {
  assert.equal(farewell("world", "fr"), "Au revoir, world !");
});

test("farewell in Spanish", () => {
  assert.equal(farewell("world", "es"), "¡Adiós, world!");
});

test("farewell throws RangeError naming an unsupported locale", () => {
  for (const locale of ["de", "es-MX", "FR", "", "toString", "__proto__"]) {
    assert.throws(
      () => farewell("world", locale),
      (err) => err instanceof RangeError && err.message.includes(locale),
    );
  }
});

test("farewell throws RangeError for null locale", () => {
  assert.throws(
    () => farewell("world", null),
    (err) => err instanceof RangeError && err.message.includes("null"),
  );
});

test("farewell names the empty string locale in the RangeError", () => {
  assert.throws(
    () => farewell("world", ""),
    (err) => err instanceof RangeError && err.message.includes('""'),
  );
});

test("farewell throws RangeError naming non-string locale values", () => {
  const circular = {};
  circular.self = circular;
  const cases = [
    [1n, "1"],
    [Symbol("de"), "Symbol(de)"],
    [circular, "[object Object]"],
    [Object.create(null), "[object Object]"],
  ];
  for (const [locale, expected] of cases) {
    assert.throws(
      () => farewell("world", locale),
      (err) => err instanceof RangeError && err.message.includes(expected),
    );
  }
});
