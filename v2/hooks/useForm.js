import { useState, useEffect } from 'react';
import { useInput } from '.';
import { inputTypes } from '../constants';
import { validator } from '../validate';

export default (fields) => {
  const [values, setValues] = useState();
  const [errors, setErrors] = useState([]);
  const [validating, setValidating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isValid = errors.length === 0;

  const validate = () => {
    setValidating(true);
    setErrors([
      ...fields
        .map(({ name }) => validator[name](values[name]).error)
        .filter((field) => field !== null)
    ]);
    setValidating(false);
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
      console.log(`Submitting: ${JSON.stringify(values)}`);
      console.log(`Errors: ${JSON.stringify(errors)}`);
    }
  };
};
