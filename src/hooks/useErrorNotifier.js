import { useRef, useEffect } from 'react';
import { createNotification, getErrorResponse } from '../utils';

function useErrorNotifier(errors = []) {
  const previousErrorsRef = useRef(new Set());

  if (!Array.isArray(errors)) {
    errors = [errors];
  }

  useEffect(() => {
    (async function showNewErrors() {
      for (const error of errors) {
        if (!error) {
          continue;
        }
        if (!previousErrorsRef.current.has(error)) {
          previousErrorsRef.current = new Set([...previousErrorsRef.current, error]);
          const errorResponse = await getErrorResponse(error);
          createNotification({ message: errorResponse.message || error.message, style: 'error', duration: 5000 });
        }
      }
    })()
  }, [errors]);
}

export default useErrorNotifier;
