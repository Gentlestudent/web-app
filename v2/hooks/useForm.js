import { useState, useEffect } from 'react';
import { validator } from '../validate';

export default (fields) => {
  const [values, setValues] = useState();
  const [errors, setErrors] = useState([]);

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
    errors,
    props: {
      onChange: (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
      },
      onSubmit: (e) => {
        e.preventDefault();
        if (isValid) setIsSubmitting(true);
      }
    }
  };
};
