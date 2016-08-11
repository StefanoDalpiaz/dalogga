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

function levelPrefix(colour, levelName) {
  return {
    text: `[${levelName.toUpperCase()}]`,
    colour: colour || colorMap[levelName],
  };
}

export default colourify(levelPrefix);
