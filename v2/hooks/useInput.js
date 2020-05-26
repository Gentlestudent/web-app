import { useState } from 'react';

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
    reset: () => setValue(''),
    bind: {
      value,
      error,
      onChange: (e) => {
        const { value } = e.target;
        setValue(value);
        if (error) validate && setError(validate(value));
      },
      onBlur: (e) => {
        const { value } = e.target;
        validate && setError(validate(value));
      }
    }
  };
};
