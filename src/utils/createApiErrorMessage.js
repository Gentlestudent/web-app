import { errorCodes, errorMessages } from '../constants';

function createApiErrorMessage(code, customMessage) {
  if (!errorCodes[code]) {
    return {
      code: errorCodes.UNEXPECTED_ERROR,
      message: errorMessages[errorCodes.UNEXPECTED_ERROR]
    };
  }
  return {
    code,
    message: customMessage || errorMessages[code]
  };
}

export default createApiErrorMessage;
