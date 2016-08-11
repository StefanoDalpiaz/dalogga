import levels, { getLevelNumber } from './levels';
import timestampPrefix from './prefixes/timestampPrefix';
import levelPrefix from './prefixes/levelPrefix';

// creates an array that associates every log level with a function
function getLogFunctionArray(settings) {
  // if there is a single function in the settings, use it for all levels
  if (typeof settings.logFunction === 'function') {
    return levels.map(() => settings.logFunction);
  }

  const consoleObj = console || {};

  // for each level, check if there is a method of the `console` object with that name.
  // if not found, use the function from the previous level (e.g. 'fatal' will use `console.error`
  // because `console.fatal` does not exist).
  // this will create a list of default functions to fall back to for each level.
  const defaultLogFnArr = ['log'] // need to start from a function that undoubtedly exists, so use 'log' first
    .concat(levels)
    .reduce((logFnArr, level, index) => {
      const consoleMethod = consoleObj[level];
      return logFnArr.concat(consoleMethod ? consoleMethod.bind(consoleObj) : logFnArr[index - 1]);
    }, [])
    .slice(1); // the first entry will be `console.log`, which was manually added, so get rid of it

  const customLogFnObj = settings.logFunction || {};

  // compose the array by checking if a custom function was specified for each level,
  // and falling back to the default one if not
  return levels.map((level, index) => (
    customLogFnObj[index] || customLogFnObj[level] || defaultLogFnArr[index]
  ));
}

// parses the user-provided settings and creates an object that holds the initial state of the logger
export default function getInitialState(settings) {
  // create the array that maps all levels to a function
  const logFunction = getLogFunctionArray(settings);

  // if `useColours` is specified, force the colours usage accordingly
  // otherwise only enable colours if the current process is running in a TTY
  const useColours = typeof settings.useColours === 'boolean'
    ? settings.useColours
    : (!settings.logFunction && typeof process !== 'undefined' && (process.stdout || {}).isTTY);

  const isEnabled = settings.isEnabled !== false;
  const currentLevel = getLevelNumber(settings.level || 0);

  // if the `prefixes` property is unspecified, default to `DATE [LEVEL] - MESSAGES`
  const prefixes = [].concat(settings.prefixes || [
    timestampPrefix,
    levelPrefix,
    '-',
  ]);

  return {
    logFunction,
    prefixes,
    isEnabled,
    currentLevel,
    useColours,
  };
}
