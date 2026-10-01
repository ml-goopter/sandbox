# sandbox

Target repository for goopter_ticket_orchestra end-to-end runs. Agents branch from `main`, run `npm test`, and open pull requests here.

`greet(name, locale = "en")` in `src/greet.js` and `farewell(name, locale = "en")` in `src/farewell.js` return a message in the given locale:

| `locale` | `greet`             | `farewell`            |
| -------- | ------------------- | --------------------- |
| `"en"`   | `Hello, <name>!`    | `Goodbye, <name>!`    |
| `"fr"`   | `Bonjour, <name> !` | `Au revoir, <name> !` |
| `"es"`   | `¡Hola, <name>!`    | `¡Adiós, <name>!`     |

`locale` defaults to `"en"`. Only the lowercase codes above are supported. Any other value, including region tags such as `"es-MX"`, uppercase codes such as `"FR"`, the empty string and `null`, throws a `RangeError` that names the value.

`shout(text)` in `src/shout.js` returns `text` upper-cased followed by `"!"`, e.g. `shout("hello")` returns `"HELLO!"`.

`greetAt(name, date, locale = "en")` in `src/greet.js` returns a time-of-day greeting for `name`, based on the hour of `date` in UTC (`date.getUTCHours()`):

| `locale` | morning (05:00–11:59 UTC) | afternoon (12:00–17:59 UTC) | evening (18:00–04:59 UTC) |
| -------- | -------------------------- | --------------------------- | -------------------------- |
| `"en"`   | `Good morning, <name>!`    | `Good afternoon, <name>!`   | `Good evening, <name>!`    |
| `"fr"`   | `Bonjour, <name> !`        | `Bonjour, <name> !`         | `Bonsoir, <name> !`        |
| `"es"`   | `¡Buenos días, <name>!`    | `¡Buenas tardes, <name>!`   | `¡Buenas noches, <name>!`  |

The evening period wraps past midnight (18:00 through 04:59 UTC, inclusive). `locale` defaults to `"en"` and follows the same supported-locale rules as `greet` — any unsupported value throws a `RangeError` that names it. `date` is required and must be a valid `Date` instance; a missing, non-`Date`, or invalid `date` throws a `TypeError`.
