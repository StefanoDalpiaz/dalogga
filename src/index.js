import levels, { getLevelNumber } from './levels';
import getInitialState from './getInitialState';
import logMessages from './logMessages';
import levelPrefix from './prefixes/levelPrefix';
import timestampPrefix from './prefixes/timestampPrefix';
import { colourify } from './colours';

/**
 * Initialises a new logger object.
 * @param {object} settings
 *                          the object that contains the configuration settings for the logger.
 * @param {(function|object)} settings.logFunction
 *                          the function that writes the messages. Defaults to the
 *                          STDOUT and STDERR output through the `console` object.
 *                          Specify a single function to use for all log levels, or
 *                          a mapping object for granular control. e.g.:
 *                          `{ debug: fn1, info: fn2, error: fn3 }`
 * @param {(array|object)} settings.prefixes
 *                          an array of prefix values or functions that will be
 *                          used to prepend the output with custom values. Can
 *                          be also specified as a single value.
 * @param {boolean} settings.useColours
 *                          use coloured text for better readability in a TTY
 *                          environment. Use true or false to force the setting,
 *                          leave null or undefined to autodetect.
 * @param {(number|string)} settings.level
 *                          the minimum level of logging that will produce an output.
 *                          Use the level name (e.g. 'warn') or the level number (e.g
 *                          0 for "trace" to 6 for "fatal")
 *
 * @returns {object} the logger object
*/
export function createLogger(settings) {
  const state = getInitialState(settings || {});

  // build the logger by composing the functions to log all levels
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

// the default prefix functions are exported as part of the entry point so that the consumers
// will be able to reuse them in custom prefixes
export const prefixes = {
  levelPrefix,
  timestampPrefix,
};
