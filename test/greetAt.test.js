import { test } from "node:test";
import assert from "node:assert/strict";
import { greetAt } from "../src/greet.js";

const utc = (hour) => new Date(Date.UTC(2024, 0, 1, hour, 0, 0));

test("greetAt: morning in English", () => {
  assert.equal(greetAt("world", utc(6)), "Good morning, world!");
});

test("greetAt: afternoon in English", () => {
  assert.equal(greetAt("world", utc(14)), "Good afternoon, world!");
});

test("greetAt: evening in English", () => {
  assert.equal(greetAt("world", utc(20)), "Good evening, world!");
});

test("greetAt: morning in French", () => {
  assert.equal(greetAt("world", utc(6), "fr"), "Bonjour, world !");
});

test("greetAt: afternoon in French", () => {
  assert.equal(greetAt("world", utc(14), "fr"), "Bonjour, world !");
});

test("greetAt: evening in French", () => {
  assert.equal(greetAt("world", utc(20), "fr"), "Bonsoir, world !");
});

test("greetAt: morning in Spanish", () => {
  assert.equal(greetAt("world", utc(6), "es"), "¡Buenos días, world!");
});

test("greetAt: afternoon in Spanish", () => {
  assert.equal(greetAt("world", utc(14), "es"), "¡Buenas tardes, world!");
});

test("greetAt: evening in Spanish", () => {
  assert.equal(greetAt("world", utc(20), "es"), "¡Buenas noches, world!");
});

test("greetAt: defaults to English when locale is undefined", () => {
  assert.equal(greetAt("world", utc(6), undefined), "Good morning, world!");
});

test("greetAt: boundary hours produce the expected period (UTC)", () => {
  const cases = [
    [4, 59, "evening"],
    [5, 0, "morning"],
    [11, 59, "morning"],
    [12, 0, "afternoon"],
    [17, 59, "afternoon"],
    [18, 0, "evening"],
  ];
  const expected = {
    morning: "Good morning, world!",
    afternoon: "Good afternoon, world!",
    evening: "Good evening, world!",
  };
  for (const [hour, minute, period] of cases) {
    const date = new Date(Date.UTC(2024, 0, 1, hour, minute, 0));
    assert.equal(greetAt("world", date), expected[period]);
  }
});

test("greetAt throws RangeError naming an unsupported locale", () => {
  for (const locale of ["de", "es-MX", "FR", "", "toString", "__proto__"]) {
    assert.throws(
      () => greetAt("world", utc(6), locale),
      (err) => err instanceof RangeError && err.message.includes(locale),
    );
  }
});

test("greetAt throws RangeError for null locale", () => {
  assert.throws(
    () => greetAt("world", utc(6), null),
    (err) => err instanceof RangeError && err.message.includes("null"),
  );
});

test("greetAt names the empty string locale in the RangeError", () => {
  assert.throws(
    () => greetAt("world", utc(6), ""),
    (err) => err instanceof RangeError && err.message.includes('""'),
  );
});

test("greetAt throws RangeError naming non-string locale values", () => {
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
      () => greetAt("world", utc(6), locale),
      (err) => err instanceof RangeError && err.message.includes(expected),
    );
  }
});

test("greetAt throws TypeError when date is missing", () => {
  assert.throws(
    () => greetAt("world"),
    (err) => err instanceof TypeError,
  );
});

test("greetAt throws TypeError when date is not a Date instance", () => {
  assert.throws(
    () => greetAt("world", "not-a-date"),
    (err) => err instanceof TypeError,
  );
  assert.throws(
    () => greetAt("world", 1704096000000),
    (err) => err instanceof TypeError,
  );
});

test("greetAt throws TypeError when date is an Invalid Date", () => {
  assert.throws(
    () => greetAt("world", new Date("invalid")),
    (err) => err instanceof TypeError,
  );
});
