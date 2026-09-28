// Internal helper shared by greet and farewell. Not part of the public API.

function describe(value) {
  if (typeof value === "string") return JSON.stringify(value);
  try {
    return String(value);
  } catch {
    return Object.prototype.toString.call(value);
  }
}

export function unsupportedLocale(locale) {
  return new RangeError(`Unsupported locale: ${describe(locale)}`);
}
