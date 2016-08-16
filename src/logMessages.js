import levels from './levels';
import { getColouredMessage } from './colours';

// computes the value for a prefix
function getPrefixValue(prefix, state, level, messages) {
  // if the prefix is a function, run it and get the result, otherwise just use the static value
  const prefixValue = typeof prefix === 'function'
    ? prefix(levels[level], messages)
    : prefix;

  // the prefix can be specified as an object like `{ text, colour }`
  // if it's not in that format, just use the value normally
  if (!prefixValue || !prefixValue.text) {
    return prefixValue;
  }

  // if the prefix is in `{ text, colour }` format, but the colours are globally disabled
  // or there is no colour information for the current value, simply use the text
  if (!prefixValue.colour || !state.useColours) {
    return prefixValue.text;
  }

  // both colour and text are specified, so get the coloured version of the value
  return getColouredMessage(prefixValue.colour, prefixValue.text);
}

// composes the message to output by computing the prefixes and appending the specified messages,
// then calls the function that actually writes the data to the output
export default function logMessages(state, level, colour, ...messages) {
  // get the array of the messages to write
  const formattedMessages = messages.map(item => {
    // if the value is an object, use its JSON representation.
    // however, do not serialise it if the object is empty (i.e. there
    // are no enumerable properties, like in the Date or Error objects,
    // which would end up printed as `{}` otherwise)
    if (item && typeof item === 'object' &&
                Object.keys(item).length > 0 &&
                !(item instanceof Error) &&
                !(item instanceof Date)) {
      const json = JSON.stringify(item, null, 2);
      return state.useColours ? getColouredMessage(colour, json) : json;
    }
    return state.useColours ? getColouredMessage(colour, item) : item;
  });

  // only write the data to the output if the logger is enabled and its level allows the current data to be written
  if (state.isEnabled && state.currentLevel <= level) {
    // compute the values for all prefixes
    const prefixValues = state.prefixes.map(prefixItem =>
      getPrefixValue(prefixItem, state, level, messages)
    );

    // finally write the prefixes + messages to the output
    state.logFunction[level](
      ...prefixValues.concat(formattedMessages)
    );
  }

  return formattedMessages.join(' ');
}
