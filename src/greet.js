import { unsupportedLocale } from "./locale.js";

const GREETINGS = new Map([
  ["en", (name) => `Hello, ${name}!`],
  ["fr", (name) => `Bonjour, ${name} !`],
  ["es", (name) => `¡Hola, ${name}!`],
]);

export function greet(name, locale = "en") {
  const message = GREETINGS.get(locale);
  if (!message) {
    throw unsupportedLocale(locale);
  }
  return message(name);
}
