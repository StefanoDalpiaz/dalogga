const levels = ['trace', 'debug', 'log', 'info', 'warn', 'error', 'fatal'];

export default levels;

export function getLevelNumber(levelNameOrNumber) {
  const parsedLevelNumber = parseInt(levelNameOrNumber, 10);
  const levelNumber = isNaN(parsedLevelNumber) ? levels.indexOf(levelNameOrNumber) : levelNameOrNumber;
  if (levelNumber >= 0 && levelNumber < levels.length) {
    return levelNumber;
  }
  throw new Error(`Invalid level: ${levelNameOrNumber}`);
}
