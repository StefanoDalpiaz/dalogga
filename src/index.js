import levels, { getLevelNumber } from './levels';
import getInitialState from './getInitialState';
import logMessages from './logMessages';
import levelPrefix from './prefixes/levelPrefix';
import timestampPrefix from './prefixes/timestampPrefix';
import { colourify } from './colours';

export function createLogger(settings) {
  const state = getInitialState(settings || {});

  return levels.reduce((acc, level, index) => (
    {
      ...acc,
      [level]: colourify(logMessages.bind(undefined, state, index)),
    }
  ), {
    getLevel: () => levels[state.currentLevel],
    setLevel: level => { state.currentLevel = getLevelNumber(level); },
    disable: () => { state.isEnabled = false; },
    enable: () => { state.isEnabled = true; },
  });
}

export const prefixes = {
  levelPrefix,
  timestampPrefix,
};
