import { useState } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../assets/styles/constants';
import Icon from './icon';

const Dropdown = ({ name }) => (
  <select name={name}>
    <option value="01">01</option>
    <option value="02">02</option>
    <option value="03">03</option>
  </select>
);

const Input = ({ name, label, info, type, icon, placeholder, required, ...rest }) => {
  const [focus, setFocus] = useState(false);

  const getLabelText = () => `${label}${required ? '*' : ''}`;
  const getInfoText = () => `${required ? '' : 'Optioneel: '}${info}`;

  if (type === 'dropdown') return <Dropdown name={name} />;

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
            height: 100%;
            color: ${colors.copy};
            background: transparent;
            border: 0;
            padding: 1rem;
            box-shadow: 0 1px 1px ${colors.gray};
            margin: 1rem 0;
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
