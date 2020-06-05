import { useState } from 'react';

export default (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [showFeedback, setShowFeedback] = useState(false);

  return {
    showFeedback,
    setShowFeedback,
    setValue,
    bind: {
      value,
      onChange: (e) => {
        setValue(e.target.value);
        setShowFeedback(true);
      },
      onBlur: (e) => {
        setShowFeedback(true);
      }
    }
  };
};
