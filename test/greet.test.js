import { test } from "node:test";
import assert from "node:assert/strict";
import { greet } from "../src/greet.js";

test("greet names the caller", () => {
  assert.equal(greet("world"), "Hello, world!");
});

test("greet defaults to English when locale is undefined", () => {
  assert.equal(greet("world", undefined), "Hello, world!");
});

test("greet in English", () => {
  assert.equal(greet("world", "en"), "Hello, world!");
});

test("greet in French", () => {
  assert.equal(greet("world", "fr"), "Bonjour, world !");
});

test("greet in Spanish", () => {
  assert.equal(greet("world", "es"), "¡Hola, world!");
});

test("greet throws RangeError naming an unsupported locale", () => {
  for (const locale of ["de", "es-MX", "FR", "", "toString", "__proto__"]) {
    assert.throws(
      () => greet("world", locale),
      (err) => err instanceof RangeError && err.message.includes(locale),
    );
  }
});

test("greet throws RangeError for null locale", () => {
  assert.throws(
    () => greet("world", null),
    (err) => err instanceof RangeError && err.message.includes("null"),
  );
});

test("greet names the empty string locale in the RangeError", () => {
  assert.throws(
    () => greet("world", ""),
    (err) => err instanceof RangeError && err.message.includes('""'),
  );
});

test("greet throws RangeError naming non-string locale values", () => {
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
      () => greet("world", locale),
      (err) => err instanceof RangeError && err.message.includes(expected),
    );
  }
});
