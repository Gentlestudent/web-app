import { useState } from 'react';

/*
 * Form field hook
 */
export default (initialValue, validate) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

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
        validate && setError(validate(value));
        setValue(value);
      }
    }
  };
};
