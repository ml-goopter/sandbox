import { test } from "node:test";
import assert from "node:assert/strict";
import { welcomeBack } from "../src/welcome-back.js";

test("welcomeBack names the caller", () => {
  assert.equal(welcomeBack("world"), "Welcome back, world!");
});

test("welcomeBack defaults to English when locale is undefined", () => {
  assert.equal(welcomeBack("world", undefined), "Welcome back, world!");
});

test("welcomeBack in English", () => {
  assert.equal(welcomeBack("world", "en"), "Welcome back, world!");
});

test("welcomeBack in French", () => {
  assert.equal(welcomeBack("world", "fr"), "Bon retour, world !");
});

test("welcomeBack in Spanish", () => {
  assert.equal(welcomeBack("world", "es"), "¡Bienvenido de nuevo, world!");
});

test("welcomeBack throws RangeError naming an unsupported locale", () => {
  for (const locale of ["de", "es-MX", "FR", "", "toString", "__proto__"]) {
    assert.throws(
      () => welcomeBack("world", locale),
      (err) => err instanceof RangeError && err.message.includes(locale),
    );
  }
});

test("welcomeBack throws RangeError for null locale", () => {
  assert.throws(
    () => welcomeBack("world", null),
    (err) => err instanceof RangeError && err.message.includes("null"),
  );
});

test("welcomeBack names the empty string locale in the RangeError", () => {
  assert.throws(
    () => welcomeBack("world", ""),
    (err) => err instanceof RangeError && err.message.includes('""'),
  );
});

test("welcomeBack throws RangeError naming non-string locale values", () => {
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
      () => welcomeBack("world", locale),
      (err) => err instanceof RangeError && err.message.includes(expected),
    );
  }
});
