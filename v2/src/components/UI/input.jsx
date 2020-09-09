import PropTypes from 'prop-types';
import { colors } from '../../assets/styles';

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
            // width: 100%;
            // background: ${colors.grayLight};
            // padding: 2rem;
            // border: 1px solid ${colors.gray};
            // box-shadow: inset 0 0 0.8rem rgba(0, 0, 0, 0.2);
            // border-radius: 1rem;
            border: 0.1rem solid ${colors.border};
            border-radius: 30px;
            padding: 10px 12px 10px 44px;
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
