import PropTypes from 'prop-types';
import { colors } from '../../assets/styles';

const Dropdown = ({ name, placeholder, options, value, required = false, ...rest }) => (
  <>
    <select name={name} {...rest} defaultValue="" value={value}>
      {placeholder && (
        <option value="" disabled={required} hidden={required}>
          {placeholder}
        </option>
      )}
      {options.map((option, id) => (
        <option key={id.toString()}>{option}</option>
      ))}
    </select>
    <style jsx>
      {`
        select {
          width: 100%;
          border: 1px solid ${colors.gray};
          border-radius: 1rem;
          padding: 2rem;
          background: ${colors.grayLight};
          color: ${colors.gray};
          box-shadow: inset 0 0 0.8rem rgba(0, 0, 0, 0.2);
        }
      `}
    </style>
  </>
);

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  required: PropTypes.bool
};

export default Dropdown;
