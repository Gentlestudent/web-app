import PropTypes from 'prop-types';
import { colors } from '../../assets/styles';
import Icon from './icon';

const Button = ({ icon, type, isLoading, href, primary, children, text, ...rest }) => (
  <>
    {/* see https://github.com/yannickcr/eslint-plugin-react/issues/1555 */}
    {/* eslint-disable-next-line react/button-has-type */}
    <button className={primary ? 'primary' : ''} type={type} {...rest}>
      {text ? <span className="button-text">{text}</span> : ''}
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
        }

        .button-text {
          margin-right: 1.2rem;
        }

        button.primary {
          background-color: ${colors.primary};
          min-height: 4.5rem;

          border-radius: 3rem;
          margin: 1rem 0;
          padding: 1.3rem 1.6rem 1.3rem 2.2rem;
          vertical-align: middle;
          font-weight: 700;
          line-height: 1.1;
          color: #fff;
        }

        button.primary:hover {
          cursor: pointer;
          transition: all 0.25s ease;
          background-color: ${colors.orange};
        }

        i {
          margin-right: 1rem;
        }
      `}
    </style>
  </>
);

Button.propTypes = {
  text: PropTypes.string,
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
