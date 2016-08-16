import { createLogger } from '../src';
import levels from '../src/levels';

describe('logger levels', () => {
  const sandbox = sinon.sandbox.create();
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

  context('when setting the wrong level', () => {
    it('should throw an error', () => {
      expect(() => logger.setLevel('foo')).to.throw('Invalid level: foo');
    });
  });

  context('when setting a level as a number', () => {
    it('should set the right level', () => {
      logger.setLevel(1);
      expect(logger.getLevel()).to.eql('debug');
    });
  });

  context('when setting a level as a string', () => {
    it('should set the right level', () => {
      logger.setLevel('warn');
      expect(logger.getLevel()).to.eql('warn');
    });
  });

  function testLogOutput(methods) {
    Object.keys(methods).forEach(methodName => {
      const shouldLog = methods[methodName];
      const testString = `should ${shouldLog ? '' : 'not '}log "${methodName}" messages`;
      it(testString, () => {
        logger[methodName](testString);
        if (shouldLog) {
          expect(logFunctionMap[methodName]).to.have.been.calledWith(testString);
        } else {
          expect(logFunctionMap[methodName]).to.not.have.been.called;
        }
      });
    });
  }

  [true, false].forEach(isEnabled => {
    context(`when the logger is ${isEnabled ? 'enabled' : 'disabled'}`, () => {
      beforeEach(() => {
        if (isEnabled) {
          logger.enable();
        } else {
          logger.disable();
        }
      });

      context('when the minimum level is "trace"', () => {
        beforeEach(() => {
          logger.setLevel('trace');
        });

        it('should get the correct level', () => {
          const level = logger.getLevel();
          expect(level).to.eql('trace');
        });

        it(`should set the state as ${isEnabled ? 'enabled' : 'disabled'}`, () => {
          const isEnabledState = logger.isEnabled();
          expect(isEnabledState).to.eql(isEnabled);
        });

        testLogOutput({
          trace: isEnabled,
          debug: isEnabled,
          log: isEnabled,
          info: isEnabled,
          warn: isEnabled,
          error: isEnabled,
          fatal: isEnabled,
        });
      });

      context('when the minimum level is "debug"', () => {
        beforeEach(() => {
          logger.setLevel('debug');
        });

        it('should get the correct level', () => {
          const level = logger.getLevel();
          expect(level).to.eql('debug');
        });

        testLogOutput({
          trace: false,
          debug: isEnabled,
          log: isEnabled,
          info: isEnabled,
          warn: isEnabled,
          error: isEnabled,
          fatal: isEnabled,
        });
      });

      context('when the minimum level is "log"', () => {
        beforeEach(() => {
          logger.setLevel('log');
        });

        it('should get the correct level', () => {
          const level = logger.getLevel();
          expect(level).to.eql('log');
        });

        testLogOutput({
          trace: false,
          debug: false,
          log: isEnabled,
          info: isEnabled,
          warn: isEnabled,
          error: isEnabled,
          fatal: isEnabled,
        });
      });

      context('when the minimum level is "info"', () => {
        beforeEach(() => {
          logger.setLevel('info');
        });

        it('should get the correct level', () => {
          const level = logger.getLevel();
          expect(level).to.eql('info');
        });

        testLogOutput({
          trace: false,
          debug: false,
          log: false,
          info: isEnabled,
          warn: isEnabled,
          error: isEnabled,
          fatal: isEnabled,
        });
      });

      context('when the minimum level is "warn"', () => {
        beforeEach(() => {
          logger.setLevel('warn');
        });

        it('should get the correct level', () => {
          const level = logger.getLevel();
          expect(level).to.eql('warn');
        });

        testLogOutput({
          trace: false,
          debug: false,
          log: false,
          info: false,
          warn: isEnabled,
          error: isEnabled,
          fatal: isEnabled,
        });
      });

      context('when the minimum level is "error"', () => {
        beforeEach(() => {
          logger.setLevel('error');
        });

        it('should get the correct level', () => {
          const level = logger.getLevel();
          expect(level).to.eql('error');
        });

        testLogOutput({
          trace: false,
          debug: false,
          log: false,
          info: false,
          warn: false,
          error: isEnabled,
          fatal: isEnabled,
        });
      });

      context('when the minimum level is "fatal"', () => {
        beforeEach(() => {
          logger.setLevel('fatal');
        });

        it('should get the correct level', () => {
          const level = logger.getLevel();
          expect(level).to.eql('fatal');
        });

        testLogOutput({
          trace: false,
          debug: false,
          log: false,
          info: false,
          warn: false,
          error: false,
          fatal: isEnabled,
        });
      });
    });
  });
});
