export default function timestampPrefix() {
  return {
    text: new Date().toISOString(),
    colour: 'cyan',
  };
}
