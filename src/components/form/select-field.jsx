import PropTypes from 'prop-types';
import { Field } from 'formik';
import Label from './label';

const SelectField = ({ name, label, children }) => (
  <>
    <div className="field">
      <Label name={name} label={label} />
      <Field as="select" name={name}>
        {children}
      </Field>
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
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default SelectField;
