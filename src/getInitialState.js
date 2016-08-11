import levels, { getLevelNumber } from './levels';
import timestampPrefix from './prefixes/timestampPrefix';
import levelPrefix from './prefixes/levelPrefix';

function getLogFunctionArray(settings) {
  if (typeof settings.logFunction === 'function') {
    return levels.map(() => settings.logFunction);
  }

  const consoleObj = console || {};

  const defaultLogFnArr = ['log']
    .concat(levels)
    .reduce((logFnArr, level, index) => {
      const consoleMethod = consoleObj[level];
      return logFnArr.concat(consoleMethod ? consoleMethod.bind(consoleObj) : logFnArr[index - 1]);
    }, [])
    .slice(1);

  const customLogFnObj = settings.logFunction || {};

  return levels.map((level, index) => (
    customLogFnObj[index] || customLogFnObj[level] || defaultLogFnArr[index]
  ));
}

export default function getInitialState(settings) {
  const logFunction = getLogFunctionArray(settings);

  const useColours = typeof settings.useColours === 'boolean'
    ? settings.useColours
    : (!settings.logFunction && typeof process !== 'undefined' && (process.stdout || {}).isTTY);

  const isEnabled = settings.isEnabled !== false;
  const currentLevel = getLevelNumber(settings.currentLevel || 0);

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
