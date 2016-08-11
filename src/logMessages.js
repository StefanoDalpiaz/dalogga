import levels from './levels';
import getColouredMessage from './getColouredMessage';

function getMessageValue(message, state, level, messages) {
  const messageValue = typeof message === 'function'
    ? message(levels[level], messages)
    : message;

  if (!messageValue || !messageValue.text) {
    return messageValue;
  }
  if (!messageValue.colour || !state.useColours) {
    return messageValue.text;
  }
  return getColouredMessage(messageValue.colour, messageValue.text);
}

export default function logMessages(state, level, ...messages) {
  const formattedMessages = messages.map(item => {
    if (item && typeof item === 'object' && Object.keys(item).length > 0) {
      return JSON.stringify(item, null, 2);
    }
    return item;
  });

  if (state.isEnabled && state.currentLevel <= level) {
    const prefixValues = state.prefixes.map(prefixItem =>
      getMessageValue(prefixItem, state, level, messages)
    );

    state.logFunction[level](
      ...prefixValues
      .concat(formattedMessages)
    );
  }

  return formattedMessages.join(' ');
}
