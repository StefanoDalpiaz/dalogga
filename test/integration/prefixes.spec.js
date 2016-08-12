import { createLogger, prefixes } from '../../src';

describe('prefixes', () => {
  const sandbox = sinon.sandbox.create();
  const logFunction = sinon.stub();
  const timestampString = 'NOW!';
  const testString = 'foo';
  let logger;

  beforeEach(() => {
    logFunction.reset();
    sandbox.stub(Date.prototype, 'toISOString').returns(timestampString);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when prefixes is unspecified', () => {
    it('should print the defualt prefixes', () => {
      logger = createLogger({
        logFunction,
        prefixes: undefined,
      });
      logger.log(testString);
      expect(logFunction).to.have.been.calledWith(timestampString, '[LOG]', '-', testString);
    });
  });

  context('when prefixes is an empty array', () => {
    it('should print no prefixes', () => {
      logger = createLogger({
        logFunction,
        prefixes: [],
      });
      logger.log(testString);
      expect(logFunction).to.have.been.calledWith(testString);
    });
  });

  context('when prefixes contains a static value', () => {
    it('should use that value as prefix', () => {
      logger = createLogger({
        logFunction,
        prefixes: [
          'prefix',
        ],
      });
      logger.log(testString);
      expect(logFunction).to.have.been.calledWith('prefix', testString);
    });
  });

  context('when prefixes contains a function', () => {
    it('should use the result of the function', () => {
      logger = createLogger({
        logFunction,
        prefixes: [
          () => 'dynamic prefix',
        ],
      });
      logger.log(testString);
      expect(logFunction).to.have.been.calledWith('dynamic prefix', testString);
    });
  });

  context('when prefixes contains a function that returns an object', () => {
    it('should use the text and colour from the result of the function', () => {
      logger = createLogger({
        logFunction,
        useColours: true,
        prefixes: [
          () => ({ text: 'coloured prefix', colour: 'red' }),
        ],
      });
      logger.log(testString);
      expect(logFunction).to.have.been.calledWith('\x1b[31mcoloured prefix\x1b[0m', testString);
    });
  });

  context('when prefixes contains the timestamp default function', () => {
    it('should print the current timestamp', () => {
      logger = createLogger({
        logFunction,
        prefixes: [
          prefixes.timestampPrefix,
        ],
      });
      logger.log(testString);
      expect(logFunction).to.have.been.calledWith(timestampString, testString);
    });
  });

  context('when prefixes contains the level default function', () => {
    it('should print the current level', () => {
      logger = createLogger({
        logFunction,
        prefixes: [
          prefixes.levelPrefix,
        ],
      });
      logger.log(testString);
      expect(logFunction).to.have.been.calledWith('[LOG]', testString);
    });
  });

  context('when prefixes contains different elements', () => {
    it('should print all prefixes', () => {
      logger = createLogger({
        logFunction,
        prefixes: [
          'static',
          prefixes.levelPrefix,
          () => 'dynamic',
          prefixes.timestampPrefix,
        ],
      });
      logger.log(testString);
      expect(logFunction).to.have.been.calledWith('static', '[LOG]', 'dynamic', timestampString, testString);
    });
  });
});
