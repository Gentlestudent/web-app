import PropTypes from 'prop-types';
import { colors } from '../../assets/styles/constants';

const Dropdown = ({ name, placeholder, options }) => (
  <>
    <select name={name}>
      {placeholder && <option>{placeholder}</option>}
      {options.map((option, id) => (
        <option>{option}</option>
      ))}
    </select>
    <style jsx>{`
      select {
        width: 100%;
        border: 1px solid ${colors.gray};
        border-radius: 1rem;
        padding: 2rem;
        background: transparent;
      }
    `}</style>
  </>
);

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool
};

export default Dropdown;
