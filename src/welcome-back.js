import { unsupportedLocale } from "./locale.js";

const WELCOME_BACKS = new Map([
  ["en", (name) => `Welcome back, ${name}!`],
  ["fr", (name) => `Bon retour, ${name} !`],
  ["es", (name) => `¡Bienvenido de nuevo, ${name}!`],
]);

export function welcomeBack(name, locale = "en") {
  const message = WELCOME_BACKS.get(locale);
  if (!message) {
    throw unsupportedLocale(locale);
  }
  return message(name);
}
