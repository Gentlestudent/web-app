import PropTypes from 'prop-types';
import { Field } from 'formik';
import Error from './error';
import Label from './label';

const InputField = ({ name, type, label, ...props }) => (
  <>
    <div className={`field ${type === 'checkbox' && 'field--checkbox'}`}>
      <Label name={name} label={label} inline={type === 'checkbox'}>
        <Field id={name} name={name} type={type || 'text'} {...props} />
      </Label>
      <Error name={name} />
    </div>

    <style jsx>
      {`
        .field {
          display: flex;
          flex-direction: column;
          margin-bottom: 2.5rem;
        }

        .field--checkbox {
          flex-direction: row;
          margin: 1rem 0;
        }
      `}
    </style>
  </>
);

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default InputField;
