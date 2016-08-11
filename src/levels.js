const levels = ['trace', 'debug', 'log', 'info', 'warn', 'error', 'fatal'];

export default levels;

// translates a level input (which can be the level number or a level name) to the corresponding level number
export function getLevelNumber(levelNameOrNumber) {
  const parsedLevelNumber = parseInt(levelNameOrNumber, 10);
  // if the input is not already a number, get the position of the input string in the levels array
  const levelNumber = isNaN(parsedLevelNumber) ? levels.indexOf(levelNameOrNumber) : levelNameOrNumber;
  // only allow the correct range of levels
  if (levels[levelNumber]) {
    return levelNumber;
  }
  throw new Error(`Invalid level: ${levelNameOrNumber}`);
}
