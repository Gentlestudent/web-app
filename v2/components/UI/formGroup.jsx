import { useState } from 'react';
import PropTypes from 'prop-types';

import { Input, TextArea, Dropdown } from '.';

import { colors } from '../../assets/styles/constants';
import Icon from './icon';

const FormGroup = ({ type, name, info, required, label, icon, ...rest }) => {
  const [focus, setFocus] = useState(false);

  const getLabelText = () => `${label}${required ? '*' : ''}`;
  const getInfoText = () => `${required ? '' : 'Optioneel: '}${info}`;

  const getInputByType = () => {
    switch (type) {
      case 'text':
        return <Input type={type} {...rest} />;
      case 'textarea':
        return <TextArea name={name} {...rest} />;
      case 'dropdown':
        return <Dropdown name={name} {...rest} />;
    }
  };

  return (
    <div onMouseEnter={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
      {label && <label htmlFor={name}>{getLabelText()}</label>}
      {icon && (
        <i>
          <Icon name={icon} />
        </i>
      )}
      {getInputByType()}
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

FormGroup.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.string.isRequired
};

FormGroup.defaultProps = {
  icon: null
};

export default FormGroup;
