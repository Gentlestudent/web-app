import { difficultyValues } from '../constants';

function getDifficultyConstantName(difficulty) {
  try {
    return Object.entries(difficultyValues).find(([, value]) => value === difficulty)[0];
  } catch {
    return difficulty;
  }
}

export default getDifficultyConstantName;
