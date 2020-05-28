import PropTypes from 'prop-types';
import { colors } from '../../assets/styles/constants';
import Icon from './icon';

const Button = ({ icon, type, isLoading, href, primary, children, ...rest }) => (
  <>
    {/* see https://github.com/yannickcr/eslint-plugin-react/issues/1555 */}
    {/* eslint-disable-next-line react/button-has-type */}
    <button className={primary ? 'primary' : ''} type={type} {...rest}>
      {icon && (
        <i>
          <Icon name={icon} />
        </i>
      )}
      {children}
    </button>
    <style jsx>
      {`
        button {
          display: flex;
          background-color: ${colors.orange};
          border: 0;
          cursor: pointer;
          padding: 2rem 4rem;
          color: ${colors.white};
          font-size: 1.6rem;
          font-weight: bold;
          border-radius: 0.3rem;
        }

        button.primary {
          background-color: ${colors.primary};
        }

        button.primary:hover {
          cursor: pointer;
          transition: all 200ms ease-in-out;
          color: ${colors.primary};
          background-color: transparent;
        }

        i {
          margin-right: 1rem;
        }
      `}
    </style>
  </>
);

Button.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  isLoading: PropTypes.bool,
  href: PropTypes.string,
  primary: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  type: 'button'
};

export default Button;
