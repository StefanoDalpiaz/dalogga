import { createLogger } from '../../src';
import levels from '../../src/levels';

describe('default settings', () => {
  const sandbox = sinon.sandbox.create();
  const timestampString = 'NOW!';
  let logger;

  beforeEach(() => {
    sandbox.stub(Date.prototype, 'toISOString').returns(timestampString);
    levels.forEach(level => {
      if (console[level]) {
        sandbox.stub(console, level);
      }
    });
    logger = createLogger();
  });

  afterEach(() => {
    sandbox.restore();
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
        expect(console[expectedConsoleMethod]).to.have.been.calledWithMatch(timestampString, `[${level.toUpperCase()}]`, '-', text);
      });
    });
  });
});
