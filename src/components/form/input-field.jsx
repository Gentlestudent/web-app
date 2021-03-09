import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';
import { colors } from '../../assets/styles';
import { Error, Label } from '.';

const InputField = ({ name, type, placeholder, label }) => (
  <>
    <div className="field">
      <Label label={label} />
      <Field id={name} name={name} type={type || 'text'} placeholder={placeholder || ''} />
      <Error name={name} />
    </div>

    <style jsx>
      {`
        .field {
          display: flex;
          flex-direction: column;
          margin-bottom: 2.5rem;
        }
      `}
    </style>
  </>
);

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default InputField;
