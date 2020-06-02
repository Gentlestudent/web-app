import { useState, useEffect } from 'react';
import { validator } from '../validate';

export default (fields) => {
  const [values, setValues] = useState();
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState([]);

  const isValid = errors.length === 0;

  const validate = () => {
    setErrors([
      ...fields
        .map(({ name }) => {
          let error;
          if (validator[name] !== undefined) {
            error = validator[name](values[name]).error;
          } else {
            error = null;
          }
          return error;
        })
        .filter((field) => field !== null)
    ]);
  };

  /*
  useEffect(() => {
    if (values.length > 0) validate();
  }, [values]);
  */

  return {
    isValid,
    values,
    setValues,
    formProps: {
      errors,
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
