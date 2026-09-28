# sandbox

Target repository for goopter_ticket_orchestra end-to-end runs. Agents branch from `main`, run `npm test`, and open pull requests here.

`greet(name, locale = "en")` in `src/greet.js` and `farewell(name, locale = "en")` in `src/farewell.js` return a message in the given locale:

| `locale` | `greet`             | `farewell`            |
| -------- | ------------------- | --------------------- |
| `"en"`   | `Hello, <name>!`    | `Goodbye, <name>!`    |
| `"fr"`   | `Bonjour, <name> !` | `Au revoir, <name> !` |
| `"es"`   | `¡Hola, <name>!`    | `¡Adiós, <name>!`     |

`locale` defaults to `"en"`. Only the lowercase codes above are supported. Any other value, including region tags such as `"es-MX"`, uppercase codes such as `"FR"`, the empty string and `null`, throws a `RangeError` that names the value.
