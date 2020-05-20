import PropTypes from 'prop-types';

const Dropdown = ({ name, placeholder, options }) => (
  <select name={name}>
    {placeholder && <option>{placeholder}</option>}
    {options.map((option, id) => (
      <option>{option}</option>
    ))}
  </select>
);

Dropdown.propTypes = {
  name: PropTypes.isRequired,
  options: PropTypes.array.isRequired
};

export default Dropdown;
