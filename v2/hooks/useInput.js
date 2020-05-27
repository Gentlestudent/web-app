import { useState, useEffect } from 'react';

/*
 * Form field hook
 */
export default (initialValue, validate) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);

  return {
    value,
    error,
    setValue,
    reset: () => {
      setValue('');
      setError('');
    },
    bind: {
      value,
      error,
      onChange: (e) => {
        setValue(e.target.value);
        if (error && validate) {
          setError(validate(value).error);
        }
      },
      onBlur: (e) => {
        if (validate) {
          setError(validate(e.target.value).error);
        }
      }
    }
  };
};
