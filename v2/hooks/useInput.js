import { useState } from 'react';

export default (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [showError, setShowError] = useState(false);

  return {
    reset: () => {
      setValue('');
    },
    showError,
    bind: {
      value,
      onChange: (e) => {
        setValue(e.target.value);
        setShowError(true);
      },
      onBlur: (e) => {
        setShowError(true);
      }
    }
  };
};
