import { useState, useEffect } from 'react';
import { validator } from '../validate';

export default (fields) => {
  const [values, setValues] = useState();
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const isValid = errors.length === 0;

  const validate = () => {
    setErrors([
      ...fields
        .map(({ name }) => validator[name](values[name]).error)
        .filter((field) => field !== null)
    ]);
  };

  useEffect(() => {
    if (values) validate();
  }, [values]);

  return {
    values,
    setValues,
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
      if (isValid) setSubmitting(true);
    }
  };
};
