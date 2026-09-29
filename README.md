# sandbox

Target repository for goopter_ticket_orchestra end-to-end runs. Agents branch from `main`, run `npm test`, and open pull requests here.

`greet(name, locale = "en")` in `src/greet.js`, `farewell(name, locale = "en")` in `src/farewell.js`, and `welcomeBack(name, locale = "en")` in `src/welcome-back.js` return a message in the given locale:

| `locale` | `greet`             | `farewell`            | `welcomeBack`                   |
| -------- | ------------------- | ---------------------- | -------------------------------- |
| `"en"`   | `Hello, <name>!`    | `Goodbye, <name>!`    | `Welcome back, <name>!`          |
| `"fr"`   | `Bonjour, <name> !` | `Au revoir, <name> !` | `Bon retour, <name> !`           |
| `"es"`   | `¡Hola, <name>!`    | `¡Adiós, <name>!`     | `¡Bienvenido de nuevo, <name>!`  |

`locale` defaults to `"en"`. Only the lowercase codes above are supported. Any other value, including region tags such as `"es-MX"`, uppercase codes such as `"FR"`, the empty string and `null`, throws a `RangeError` that names the value.
