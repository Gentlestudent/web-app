import PropTypes from 'prop-types';
import { colors } from '../../assets/styles/constants';

const Input = ({ type, name, placeholder, required }) => {
  return (
    <>
      <input type={type} name={name} placeholder={placeholder} required={required} />
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
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired
};

Input.defaultProps = {
  icon: null,
  placeholder: ''
};

export default Input;
