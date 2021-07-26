import { errorCodes, errorMessages } from '../constants';

function getErrorMessage(code) {
  if (!errorCodes[code]) {
    return code;
  }
  return errorMessages[code];
}

export default getErrorMessage;
