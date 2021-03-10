import PropTypes from 'prop-types';
import Link from 'next/link';
import { colors } from '../../assets/styles';
import Icon from './icon';

const Button = ({
  icon,
  isLoading,
  href = '',
  primary,
  reverse = false,
  white = false,
  text,
  type,
  ...rest
}) => (
  <>
    {/* see https://github.com/yannickcr/eslint-plugin-react/issues/1555 */}
    {/* eslint-disable-next-line react/button-has-type */}
    {type ? (
      <button
        type={type || 'button'}
        className={`button ${primary ? 'button--primary' : 'button--secondary'} ${
          reverse && 'button--reverse'
        }`}
        {...rest}
      >
        {text ? <span className="button__text">{text}</span> : ''}
        {icon && (
          <i>
            <Icon name={icon} />
          </i>
        )}
      </button>
    ) : (
<<<<<<< HEAD
      <Link href={href}>
        <a
          className={`button ${primary ? 'button--primary' : 'button--secondary'} ${
            reverse && 'button--reverse'
          } ${white && 'button--white'}`}
          {...rest}
        >
          {text ? <span className="button__text">{text}</span> : ''}
          {icon && (
            <i>
              <Icon name={icon} />
            </i>
          )}
        </a>
      </Link>
=======
      <a
        className={`button ${primary ? 'button--primary' : 'button--secondary'} ${
          reverse && 'button--reverse'
        }`}
        {...rest}
      >
        {text ? <span className="button__text">{text}</span> : ''}
        {icon && (
          <i>
            <Icon name={icon} />
          </i>
        )}
        {/* {children} */}
      </a>
>>>>>>> f4f43a3... added extra fields and checks to opportunity form
    )}

    <style jsx>
      {`
        .button {
          display: inline-flex;
          border: 0;
          cursor: pointer;
          font-size: 1.6rem;
          font-weight: bold;
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .button--primary {
          background-color: ${colors.primary};
          min-height: 4.5rem;
          border-radius: 3rem;
          margin: 3rem 0 0.5rem;
          padding: 1.3rem 1.6rem 1.3rem 2.2rem;
          vertical-align: middle;
          line-height: 1.1;
          color: ${colors.white};
        }

        .button--secondary {
          color: ${colors.grayDark};
          background-color: transparent;
          padding: 0;
          margin: 1rem 0;
        }

<<<<<<< HEAD
        .button--white {
          color: white;
          opacity: 0.6;
        }

=======
>>>>>>> f4f43a3... added extra fields and checks to opportunity form
        .button--reverse {
          flex-direction: row-reverse;
        }

        .button:focus {
          outline: none;
        }

        .button--primary:hover {
          cursor: pointer;
          background-color: ${colors.orange};
        }

        .button--secondary:hover {
          color: ${colors.orange};
        }

        .button--white:hover {
          color: white;
          opacity: 1;
        }

        i {
          margin: 0 1rem;
        }
      `}
    </style>
  </>
);

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  isLoading: PropTypes.bool,
  href: PropTypes.string,
  primary: PropTypes.bool,
  back: PropTypes.bool,
<<<<<<< HEAD
  reverse: PropTypes.bool,
  white: PropTypes.bool
=======
  reverse: PropTypes.bool
  // children: PropTypes.node.isRequired
>>>>>>> f4f43a3... added extra fields and checks to opportunity form
};

export default Button;
