import PropTypes from 'prop-types';
import { colors } from '../../assets/styles/constants';

const Input = ({ type, name, placeholder, required, ...rest }) => {
  return (
    <>
      <input type={type} name={name} placeholder={placeholder} required={required} {...rest} />
      <style jsx>
        {`
          input {
            width: 100%;
            background: transparent;
            padding: 2rem;
            border: 1px solid ${colors.gray};
            border-radius: 1rem;
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
  icon: PropTypes.string
};

Input.defaultProps = {
  icon: null,
  placeholder: ''
};

export default Input;
