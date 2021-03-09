import PropTypes from 'prop-types';
import { colors } from '../assets/styles';

const Input = ({ type, name, placeholder, required, error, value, ...rest }) => {
  return (
    <>
      <input
        className={`input-${type}`}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        {...rest}
      />
      <style jsx>
        {`
          input {
            border: 0.1rem solid ${colors.border};
            border-radius: 3rem;
            padding: 1rem 1.2rem 1rem 4.4rem;
            position: relative;
          }

          input:focus {
            border: 0.1rem solid ${colors.blue};
            outline: none;
          }

          .input-search,
          .input-text {
            width: 100%;
            height: 4.6rem;
          }
        `}
      </style>
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string
};

Input.defaultProps = {
  icon: null,
  placeholder: ''
};

export default Input;
