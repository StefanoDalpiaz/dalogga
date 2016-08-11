import levels from './levels';
import { getColouredMessage } from './colours';

function getPrefixValue(prefix, state, level, messages) {
  const prefixValue = typeof prefix === 'function'
    ? prefix(levels[level], messages)
    : prefix;

  if (!prefixValue || !prefixValue.text) {
    return prefixValue;
  }
  if (!prefixValue.colour || !state.useColours) {
    return prefixValue.text;
  }
  return getColouredMessage(prefixValue.colour, prefixValue.text);
}

export default function logMessages(state, level, colour, ...messages) {
  const formattedMessages = messages.map(item => {
    if (item && typeof item === 'object' && Object.keys(item).length > 0) {
      const json = JSON.stringify(item, null, 2);
      return state.useColours ? getColouredMessage(colour, json) : json;
    }
    return state.useColours ? getColouredMessage(colour, item) : item;
  });

  if (state.isEnabled && state.currentLevel <= level) {
    const prefixValues = state.prefixes.map(prefixItem =>
      getPrefixValue(prefixItem, state, level, messages)
    );

    state.logFunction[level](
      ...prefixValues
      .concat(formattedMessages)
    );
  }

  return formattedMessages.join(' ');
}
