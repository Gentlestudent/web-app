import { useState, useEffect } from 'react';

export default (initialValue, validate) => {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return {
    values,
    errors,
    handleChange: (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value
      });
    },
    handleSubmit: (e) => {
      e.preventDefault();
      setErrors(validate(values));
      errors.length < 0 && setSubmitting(true);
    }
  };
};
