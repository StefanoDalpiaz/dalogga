# dalogga

`dalogga` is yet another Javascript logger. It supports different logging levels (_trace_, _debug_, _log_, _info_, _warn_, _error_, _fatal_), global enabling/disabling of all output, custom prefixes, automatic JSON serialisation and colours. It can run both in the browser and in Node, and can be imported using any of the main module systems (ES6 modules, CommonJS, AMD, global scope).

## Usage

Use `npm` to install the module:

```sh
npm install --save dalogga
```

### Using with ES6 modules

Simply import the `createLogger` function from the library:

```js
import { createLogger } from 'dalogga';

const logger = createLogger();

logger.info('it works with ES6 modules!');
```

### Using with CommonJS modules

Simply require the `dalogga` package and call its `createLogger` method:

```js
var dalogga = require('dalogga');

var logger = dalogga.createLogger();

logger.info('it works with CommonJS!');
```

### Using as a globally-scoped variable

For those frontend projects that do not use a module bundler (like [webpack](https://webpack.github.io) or (browserify)[http://browserify.org]), it is possible to include a `script` tag in the page, and the `dalogga` library will be available in the global scope:

```html
<script src="path/to/dalogga.js"></script>

<script>
  var logger = dalogga.createLogger();

  logger.info('it works in the global scope too!');
</script>
```

## Initialisation settings

When calling the `createLogger` function, it is possible to specify some initialisation settings to customise the logger. These settings are specified through an optional object, passed as the first argument of the `createLogger` function. Example:

```js
const logger = dalogga.createLogger({
  logFunction: (...values) => { sendSomewhere(values); },
  prefixes: [
    'Static prefix',
    (level, values) => 'Messages passed: ' + values.length,
    'Another static prefix',
  ],
  useColours: true,
  level: 'debug',
  isEnabled: false,
});
```

### Parameters

The settings object supports the following parameters:

* __logFunction__ _(function|object)_: the function that writes the messages. Defaults to the STDOUT and STDERR output through the `console` object. Specify a single function to use for all log levels (e.g. `logFunction: fn1`), or a mapping object for granular control. e.g.: `logFunction: { debug: fn1, info: fn2, error: fn3 }`

* __prefixes__ _(array|object)_: an array of prefix values or functions that will be used to prepend the output with custom values. Can be also specified as a single value. See below for more information. Defaults to 'DATE [LEVEL] - '

* __useColours__ _(boolean)_: use coloured text for better readability in a TTY environment. Use true or false to force the setting, leave null or undefined to autodetect the output, so that the colours will only be used when writing to a terminal environment. Defaults to autodetect.

* __level__ _(number|string)_: the minimum level of logging that will produce an output. Use the level name (e.g. 'warn') or the level number. Defaults to 'trace' (write all levels). The level number goes from 0 to 6, and each value corresponds to the following:
    * 0: trace
    * 1: debug
    * 2: log
    * 3: info
    * 4: warn
    * 5: error
    * 6: fatal

* __isEnabled__ _(boolean)_: when this parameter is `false`, the logger will not output any data. Defaults to `true`.

## Logger methods

The `createLogger` function returns an object that exposes the following methods:

* __disable__(): once this method is invoked, the logger will not output any data at any level, until the `enable` method is called
* __enable__(): if the logger was previously disabled, it will get re-enabled. The logger level will remain unaffected
* __getLevel__(): returns the name of the current minimum level that generates an output
* __setLevel__(level): sets the current minimum level that generates an output. The `level` argument can be either the level name, or the corresponding level number (see list above)

In addition to the above 'maintenance' methods, the logger also exposes the actual methods to print the output. When one of these methods is invoked, the function prints all the prefixes followed by the specified values. These methods accept any number of arguments of any type. If any of those values is an object, it gets automatically serialised to JSON format. The list of methods is listed below:

* __trace__(values)
* __debug__(values)
* __log__(values)
* __info__(values)
* __warn__(values)
* __error__(values)
* __fatal__(values)

## Colours

When printing to a terminal environment, dalogga supports printing coloured text. The following colours are supported:

* black
* red
* green
* yellow
* blue
* magenta
* cyan
* white

To print a line using a different colour than the default one, call the logging method in the following way: `logger.level.colour(values)`.

Examples:

```js
logger.info.blue('This is blue text');

logger.log.yellow('This is yellow text');

logger.error.red('This is a red error text');
```

When the coloured output is disabled (so when not running in TTY environment, or when setting the `useColours` parameter to `false` when creating the logger), the colour methods will have exactly the same output as the "normal" logging methods - e.g. calling `logger.log.blue('foo')` will be the same as calling `logger.log('foo')`.

## Prefixes

By default, the logger will prefix every written line with the current timestamp, the specified logging level, and a hyphen separator. For example the command `logger.warn('you have been warned!')` will output the following text:

`2016-08-11T10:41:16.713Z [WARN] - you have been warned!`

When running in a terminal environment, the timestamp prefix will use the cyan colour, while the log level prefix will have a different colour for each level.

It is possible to customise the prefixes to use, and to create custom ones. This can be done through the `prefixes` parameter of the settings object passed to the `createLogger` function. The parameter expects an array of prefixes (or an individual prefix, which is equivalent to an array with a single element). Setting the `prefixes` parameter will override the default prefixes, so to disable all prefixes, simply pass an empty array:

```js
const logger = dalogga.createLogger({
  prefixes: [], // this will disable all prefixes
});
```

### Specify static prefixes

To specify a static prefix (i.e. a value that will be the same in evey line of the output), simply add that value to the `prefixes` array, e.g.:

```js
const logger = dalogga.createLogger({
  prefixes: [ // this will print 'prefix1 prefix2' in front of every line
    'prefix1',
    'prefix2'
  ],
});
```

### Specify dynamic prefixes

It is also possible to compute the value of the prefixes just before printing the line, so that the output will contain information that is specific to every entry. The timestamp prefix is an example of this. To specify a dynamic prefix, add a function to the `prefixes` array. This function will be executed every time a log line needs to be printed. The function will receive two arguments:

* __levelName__: the name of the level that was just invoked
* __messages__: the array of values (not including prefixes) that will be printed

The value that will be printed as the prefix is the value returned by the function.

Example:

```js
const logger = dalogga.createLogger({
  prefixes: [
    (level, values) => 'Messages: ' + values.length,
    '-',
  ],
});

logger.log('value1', 'value2'); // this will print 'Messages: 2 - value1 value2'
```

### Reusing the default prefixes

The `dalogga` library also exposes the functions for the default prefixes (timestamp and level), so that they can be combined with any other custom prefixes. Example:

```js
const logger = dalogga.createLogger({
  prefixes: [ // this will modify the prefixes so that the level will be printed before the timestamp
    dalogga.prefixes.levelPrefix,
    dalogga.prefixes.timestampPrefix,
    '-',
  ],
});
```

When using ES6 modules, import the `prefixes` exported property, which will contain the prefix functions. Example:

```js
import { createLogger, prefixes } from 'dalogga';

const logger = createLogger({
  prefixes: [ // this will modify the prefixes so that only the timestamp will be printed, not the level
    prefixes.timestampPrefix,
    '-',
  ],
});
```
