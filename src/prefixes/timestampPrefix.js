import { colourify } from '../colours';

// writes a prefix with the timestamp in ISO format, and the specified colour.
// if no colour is specified, it uses a default one for all messages
function timestampPrefix(colour) {
  return {
    text: new Date().toISOString(),
    colour: colour || 'cyan',
  };
}

export default colourify(timestampPrefix);
