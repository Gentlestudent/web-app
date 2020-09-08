import PropTypes from 'prop-types';
import { colors } from '../../assets/styles';
import Icon from './icon';

const Button = ({ icon, isLoading, href, primary, children, text, back, ...rest }) => (
  <>
    {/* see https://github.com/yannickcr/eslint-plugin-react/issues/1555 */}
    {/* eslint-disable-next-line react/button-has-type */}
    <a className={`button ${primary ? 'button-primary' : 'button-secondary'}`} {...rest}>
      {back ? (
        <i>
          <Icon name={icon} />
        </i>
      ) : (
        ''
      )}
      {text ? <span className="button-text">{text}</span> : ''}
      {icon && !back && (
        <i>
          <Icon name={icon} />
        </i>
      )}
      {children}
    </a>
    <style jsx>
      {`
        .button {
          display: inline-block;
          border: 0;
          cursor: pointer;
          font-size: 1.6rem;
          font-weight: bold;
          transition: all 0.25s ease;
        }

        .button-text {
          margin-right: 1.2rem;
        }

        .button-primary {
          background-color: ${colors.primary};
          min-height: 4.5rem;

          border-radius: 3rem;
          margin: 3rem 0 0.5rem;
          padding: 1.3rem 1.6rem 1.3rem 2.2rem;
          vertical-align: middle;
          line-height: 1.1;
          color: ${colors.white};
        }

        .button-primary:hover {
          cursor: pointer;
          background-color: ${colors.orange};
        }

        .button-secondary {
          color: ${colors.grayDark};
          background-color: transparent;
          padding: 0;
          margin: 1rem 0;
        }

        .button-secondary:hover {
          color: ${colors.orange};
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
  isLoading: PropTypes.bool,
  href: PropTypes.string,
  primary: PropTypes.bool,
  back: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default Button;
