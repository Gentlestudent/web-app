import { categoryValues } from '../constants';

function getCategoryConstantName(category) {
  try {
    return Object.entries(categoryValues).find(([, value]) => value === category)[0];
  } catch {
    return category;
  }
}

export default getCategoryConstantName;
