import { useState } from 'react';

export default (initialValue, validator) => {
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
        if (error && validator) {
          setError(validator(value).error);
        }
      },
      onBlur: (e) => {
        if (validator) {
          setError(validator(e.target.value).error);
        }
      }
    }
  };
};
