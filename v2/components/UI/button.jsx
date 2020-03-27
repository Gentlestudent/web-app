import PropTypes from 'prop-types';
import { colors } from '@/styles/constants';
import Icon from './icon';

const Button = ({
  icon = null,
  type = 'button',
  isLoading,
  href = null,
  primary = false,
  children,
  ...rest
}) => {
  return (
    <>
      {/* see https://github.com/yannickcr/eslint-plugin-react/issues/1555 */}
      {/* eslint-disable-next-line react/button-has-type */}
      <button type={type} {...rest}>
        {children}
      </button>
      <style jsx>
        {`
          button {
            background-color: ${primary ? colors.primary : colors.orange};
            border: 0;
            cursor: pointer;
            padding: 0.8rem 3rem;
            color: ${colors.white};
            font-weight: bold;
            border-radius: 0.3rem;
          }
        `}
      </style>
    </>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  isLoading: PropTypes.bool,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool
};

export default Button;
