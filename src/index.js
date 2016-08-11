import levels, { getLevelNumber } from './levels';
import getInitialState from './getInitialState';
import logMessages from './logMessages';
import levelPrefix from './prefixes/levelPrefix';
import timestampPrefix from './prefixes/timestampPrefix';

export function createLogger(settings) {
  const state = getInitialState(settings || {});

  const logger = levels.reduce((acc, level, index) => (
    {
      ...acc,
      [level]: logMessages.bind(undefined, state, index),
    }
  ), {
    getLevel: () => levels[state.currentLevel],
    setLevel: level => { state.currentLevel = getLevelNumber(level); },
    disable: () => { state.isEnabled = false; },
    enable: () => { state.isEnabled = true; },
  });

  return logger;
}

export const prefixes = {
  levelPrefix,
  timestampPrefix,
};
