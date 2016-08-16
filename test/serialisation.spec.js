import { createLogger } from '../src';

describe('serialisation', () => {
  const sandbox = sinon.sandbox.create();
  const logFunction = sinon.stub();
  const jsonString = 'JSON!';
  let logger;

  beforeEach(() => {
    logFunction.reset();
    sandbox.stub(JSON, 'stringify').returns(jsonString);
    logger = createLogger({
      logFunction,
      prefixes: [],
      useColours: false,
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when logging a string', () => {
    it('should print the exact string', () => {
      const testString = 'foo';
      logger.log(testString);
      expect(logFunction).to.have.been.calledWith(testString);
    });
  });

  context('when logging a number', () => {
    it('should print the exact number', () => {
      const testNumber = 1;
      logger.log(testNumber);
      expect(logFunction).to.have.been.calledWith(testNumber);
    });
  });

  context('when logging an object', () => {
    it('should print the serialised object', () => {
      logger.log({ foo: 'bar' });
      expect(logFunction).to.have.been.calledWith(jsonString);
    });

    context('when colours are enabled', () => {
      it('should print the serialised object in colour', () => {
        logger = createLogger({
          logFunction,
          prefixes: [],
          useColours: true,
        });
        logger.log.red({ foo: 'bar' });
        expect(logFunction).to.have.been.calledWithMatch(new RegExp(`^\\x1b\\[\\d+m${jsonString}\\x1b\\[0m$`));
      });
    });
  });

  context('when logging an error', () => {
    it('should not serialise the error', () => {
      const error = new Error('Error!');
      logger.log(error);
      expect(logFunction).to.have.been.calledWith(error);
    });

    context('when the error object has custom properties', () => {
      it('should not serialise the error', () => {
        const error = new Error('Error!');
        error.foo = 'bar';
        logger.log(error);
        expect(logFunction).to.have.been.calledWith(error);
      });
    });
  });

  context('when logging a date', () => {
    it('should not serialise the date', () => {
      const date = new Date();
      logger.log(date);
      expect(logFunction).to.have.been.calledWith(date);
    });

    context('when the date object has custom properties', () => {
      it('should not serialise the error', () => {
        const date = new Date();
        date.foo = 'bar';
        logger.log(date);
        expect(logFunction).to.have.been.calledWith(date);
      });
    });
  });
});
