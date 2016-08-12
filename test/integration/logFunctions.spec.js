import { createLogger } from '../../src';
import levels from '../../src/levels';

describe('log functions', () => {
  const sandbox = sinon.sandbox.create();
  const logFunction = sinon.stub();
  const logFunctionMap = {
    trace: () => {},
    debug: () => {},
    log: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
    fatal: () => {},
  };
  let logger;

  beforeEach(() => {
    logFunction.reset();
    levels.forEach(level => {
      sandbox.stub(logFunctionMap, level);
    });
    logger = createLogger({
      logFunction: logFunctionMap,
      prefixes: [],
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when a map of functions is specified', () => {
    levels.forEach(level => {
      it(`should use that function for "${level}" logs`, () => {
        const text = `This is a ${level}`;
        logger[level](text);
        expect(logFunctionMap[level]).to.have.been.calledWith(text);
      });
    });
  });

  context('when a single function is specified', () => {
    beforeEach(() => {
      logger = createLogger({
        logFunction,
        prefixes: [],
      });
    });

    levels.forEach(level => {
      it(`should use that function for "${level}" logs`, () => {
        const text = `This is a ${level}`;
        logger[level](text);
        expect(logFunction).to.have.been.calledWith(text);
      });
    });
  });

  context('when the parameter is not specified', () => {
    beforeEach(() => {
      levels.forEach(level => {
        if (console[level]) {
          sandbox.stub(console, level);
        }
      });
      logger = createLogger({
        logFunction: undefined,
        prefixes: [],
      });
    });

    const consoleMethodMapping = {};
    consoleMethodMapping.trace = console.trace ? 'trace' : 'log';
    consoleMethodMapping.debug = console.debug ? 'debug' : consoleMethodMapping.trace;
    consoleMethodMapping.log = 'log';
    consoleMethodMapping.info = console.info ? 'info' : consoleMethodMapping.log;
    consoleMethodMapping.warn = console.warn ? 'warn' : consoleMethodMapping.info;
    consoleMethodMapping.error = console.error ? 'error' : consoleMethodMapping.warn;
    consoleMethodMapping.fatal = console.fatal ? 'fatal' : consoleMethodMapping.error;

    Object.keys(consoleMethodMapping).forEach((level) => {
      context(`when writing a '${level}' log`, () => {
        const expectedConsoleMethod = consoleMethodMapping[level];

        it(`should use the "${expectedConsoleMethod}" method from the global console object`, () => {
          const text = `This is a ${level}`;
          logger[level](text);
          expect(console[expectedConsoleMethod]).to.have.been.calledWith(text);
        });
      });
    });
  });
});
