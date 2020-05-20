import { useState } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../assets/styles/constants';
import Icon from './icon';

const Input = ({ name, label, info, type, icon, placeholder, required, ...rest }) => {
  const [focus, setFocus] = useState(false);

  const getLabelText = () => `${label}${required ? '*' : ''}`;
  const getInfoText = () => `${required ? '' : 'Optioneel: '}${info}`;

  return (
    <div onMouseEnter={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
      {label && <label htmlFor={name}>{getLabelText()}</label>}
      {icon && (
        <i>
          <Icon name={icon} />
        </i>
      )}
      <input type={type} placeholder={placeholder} name={name} required={required} {...rest} />
      {info && <small>{getInfoText()}</small>}
      <style jsx>
        {`
          label {
            text-transform: uppercase;
            font-weight: bold;
          }

          div {
            width: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            background-color: ${colors.white};
            border-radius: 0.3rem;
          }

          input {
            width: 100%;
            background: transparent;
            padding: 2rem;
            border: 1px solid ${colors.gray};
            border-radius: 1rem;
          }

          small {
            margin: 2rem 0;
            height: ${focus ? 'auto' : '0'};
            transform: ${focus ? 'scale(1)' : 'scale(0)'};
            opacity: ${focus ? '1' : '0'};
            transition: all 150ms ease;
          }

          i {
            color: ${colors.copy};
          }
        `}
      </style>
    </div>
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
