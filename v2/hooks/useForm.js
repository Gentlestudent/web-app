import { useState, useEffect } from 'react';
import { validator } from '../validate';

export default (fields) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState([]);

  const isValid = fields.every((field) => field.error === null);

  const validate = () => {
    setErrors([
      ...fields.map(({ name }, i) => {
        let error;
        if (validator[name] !== undefined) {
          error = validator[name](values[name]).error;
        } else {
          error = null;
        }
        fields[i].error = error;
        return error;
      })
    ]);
  };

  useEffect(() => {
    validate();
  }, [values]);

  return {
    isValid,
    values,
    setValues,
    errors,
    onChange: (field) => {
      const { name, value } = field;
      setValues({
        ...values,
        [name]: value
      });
    }
  };
};
