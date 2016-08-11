import { colourify } from '../colours';

function timestampPrefix(colour) {
  return {
    text: new Date().toISOString(),
    colour: colour || 'cyan',
  };
}

export default colourify(timestampPrefix);
