import PropTypes from 'prop-types';
import { colors } from '@/styles/constants';
import Icon from './icon';

const Input = ({ type, icon = null, placeholder = '', ...rest }) => {
  return (
    <>
      <div>
        {icon && (
          <i>
            <Icon name={icon} />
          </i>
        )}
        <input type={type} placeholder={placeholder} {...rest} />
      </div>
      <style jsx>
        {`
          div {
            width: 100%;
            position: relative;
            display: flex;
            align-items: center;
            background-color: ${colors.white};
            box-shadow: 0 1px 1px ${colors.gray};
            border-radius: 0.3rem;
          }
          input {
            width: 100%;
            height: 100%;
            color: ${colors.copy};
            background: transparent;
            border: 0;
            padding: 1rem;
          }
          i {
            color: ${colors.copy};
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

export default Input;
