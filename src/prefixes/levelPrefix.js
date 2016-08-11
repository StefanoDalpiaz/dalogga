import { colourify } from '../colours';

const colorMap = {
  trace: 'cyan',
  debug: 'cyan',
  log: 'green',
  info: 'blue',
  warn: 'yellow',
  error: 'magenta',
  fatal: 'red',
};

// writes a prefix with the current level name and the specified colour.
// if no colour is specified, it outputs a different colour for each level
function levelPrefix(colour, levelName) {
  return {
    text: `[${levelName.toUpperCase()}]`,
    colour: colour || colorMap[levelName],
  };
}

export default colourify(levelPrefix);
