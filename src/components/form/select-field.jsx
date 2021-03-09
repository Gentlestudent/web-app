import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';
import { colors } from '../../assets/styles';
import { Error, Label } from '.';

const SelectField = ({ name, placeholder, label, children }) => (
  <>
    <div className="field">
      <Label label={label} />
      <Field as="select" name={name} placeholder={placeholder || ''}>
        {children}
      </Field>
      {/* <Error name={name} /> */}
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

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.isRequired
};

export default SelectField;
