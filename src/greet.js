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

const TIME_OF_DAY_GREETINGS = new Map([
  [
    "en",
    new Map([
      ["morning", (name) => `Good morning, ${name}!`],
      ["afternoon", (name) => `Good afternoon, ${name}!`],
      ["evening", (name) => `Good evening, ${name}!`],
    ]),
  ],
  [
    "fr",
    new Map([
      ["morning", (name) => `Bonjour, ${name} !`],
      ["afternoon", (name) => `Bonjour, ${name} !`],
      ["evening", (name) => `Bonsoir, ${name} !`],
    ]),
  ],
  [
    "es",
    new Map([
      ["morning", (name) => `¡Buenos días, ${name}!`],
      ["afternoon", (name) => `¡Buenas tardes, ${name}!`],
      ["evening", (name) => `¡Buenas noches, ${name}!`],
    ]),
  ],
]);

function periodFor(hour) {
  if (hour >= 5 && hour <= 11) return "morning";
  if (hour >= 12 && hour <= 17) return "afternoon";
  return "evening";
}

export function greetAt(name, date, locale = "en") {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError(`Invalid date: ${date}`);
  }
  const messagesByPeriod = TIME_OF_DAY_GREETINGS.get(locale);
  if (!messagesByPeriod) {
    throw unsupportedLocale(locale);
  }
  const period = periodFor(date.getUTCHours());
  return messagesByPeriod.get(period)(name);
}
