import { unsupportedLocale } from "./locale.js";

const FAREWELLS = new Map([
  ["en", (name) => `Goodbye, ${name}!`],
  ["fr", (name) => `Au revoir, ${name} !`],
  ["es", (name) => `¡Adiós, ${name}!`],
]);

export function farewell(name, locale = "en") {
  const message = FAREWELLS.get(locale);
  if (!message) {
    throw unsupportedLocale(locale);
  }
  return message(name);
}
