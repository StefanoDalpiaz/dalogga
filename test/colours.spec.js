import { createLogger, prefixes } from '../src';
import colours from '../src/colours';

describe('colours', () => {
  const sandbox = sinon.sandbox.create();
  const logFunction = sinon.stub();
  const testString = 'foo';
  const timestampString = 'NOW!';
  let logger;

  beforeEach(() => {
    logFunction.reset();
    sandbox.stub(Date.prototype, 'toISOString').returns(timestampString);
  });

  afterEach(() => {
    sandbox.restore();
  });

  function getColourMatch(value) {
    return new RegExp(`^\\x1b\\[\\d+m${value}\\x1b\\[0m$`);
  }

  context('when colours are disabled', () => {
    beforeEach(() => {
      logger = createLogger({
        logFunction,
        useColours: false,
        prefixes: [
          prefixes.timestampPrefix.red,
        ],
      });
    });

    context('when trying to print in no colour', () => {
      it('should not print in colour', () => {
        logger.log(testString);
        expect(logFunction).to.have.been.calledWith(timestampString, testString);
      });
    });

    colours.forEach(colour => {
      context(`when trying to print in colour ${colour}`, () => {
        it('should not print in colour', () => {
          logger.log[colour](testString);
          expect(logFunction).to.have.been.calledWith(timestampString, testString);
        });
      });
    });
  });

  context('when colours are enabled', () => {
    beforeEach(() => {
      logger = createLogger({
        logFunction,
        useColours: true,
        prefixes: [
          prefixes.timestampPrefix.red,
        ],
      });
    });

    context('when trying to print in no colour', () => {
      it('should not print in colour', () => {
        logger.log(testString);
        expect(logFunction).to.have.been.calledWithMatch(getColourMatch(timestampString), new RegExp(`^${testString}$`));
      });
    });

    colours.forEach(colour => {
      context(`when trying to print in colour ${colour}`, () => {
        it(`should print in ${colour}`, () => {
          logger.log[colour](testString);
          expect(logFunction).to.have.been.calledWithMatch(getColourMatch(timestampString), getColourMatch(testString));
        });
      });
    });
  });
});
