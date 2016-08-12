// this object maps the colour names to the corresponding codes to use in the terminal
const colourStrings = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

const resetString = '\x1b[0m';

// creates a string that will include the colour information, if specified
export function getColouredMessage(colour, message) {
  const colourString = colourStrings[colour];
  if (!colourString || !message) {
    return message;
  }
  return `${colourString}${message}${resetString}`;
}

const colours = Object.keys(colourStrings);

export default colours;

// gets as input a function that accepts a colour as first parameter, and returns the same function
// bound to 'no colour', with an additional property for every possible colour.
// example: given the function with signature `fn1(colour, text)`, it will return a new function
// with signature `fn2(text)`, which can be called in the following ways:
//  - fn2('foo') => will correspond to `fn1(undefined, 'foo')`
//  - fn2.red('bar') => will correspond to `fn1('red', 'bar')`
//  - fn2.blue('baz') => will correspond to `fn1('blue', 'baz')`
export function colourify(fn) {
  return Object.assign(
    // use the function bound to undefined colour as the base element
    fn.bind(undefined, undefined),
    // add a property for each colour, which will be a function bound to that colour
    colours.reduce((obj, colour) => ({
      ...obj,
      [colour]: fn.bind(undefined, colour),
    }), {})
  );
}
