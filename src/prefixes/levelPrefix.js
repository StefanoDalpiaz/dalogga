const colorMap = {
  trace: 'cyan',
  debug: 'cyan',
  log: 'green',
  info: 'blue',
  warn: 'yellow',
  error: 'magenta',
  fatal: 'red',
};

export default function levelPrefix(levelName) {
  return {
    text: `[${levelName.toUpperCase()}]`,
    colour: colorMap[levelName],
  };
}
