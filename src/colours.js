const resetString = '\x1b[0m';

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

const colours = Object.keys(colourStrings);

export default colours;

export function getColouredMessage(colour, message) {
  const colourString = colourStrings[colour];
  if (!colourString || !message) {
    return message;
  }
  return `${colourString}${message}${resetString}`;
}

export function colourify(fn) {
  return Object.assign(
    fn.bind(undefined, undefined),
    colours.reduce((obj, colour) => ({
      ...obj,
      [colour]: fn.bind(undefined, colour),
    }), {})
  );
}
