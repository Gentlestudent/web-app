import { useState } from 'react';
import PropTypes from 'prop-types';

import { Input, TextArea, Dropdown } from '.';

import { colors } from '../../assets/styles/constants';
import Icon from './icon';

const FormGroup = ({ type, name, info, required, label, icon, error, ...rest }) => {
  const [focus, setFocus] = useState(false);

  const getLabelText = () => `${label}${required ? '*' : ''}`;
  const getInfoText = () => (
    <div>
      <p>
        {required ? '' : 'Optioneel: '}
        {info}
      </p>
      <style jsx>{`
        div {
          position: absolute;
          top: 100%;
          height: auto;
          width: 100%;
          z-index: 1000;
          padding: 0.5rem 2rem;
          background: ${colors.white};
          border: 1px solid ${colors.gray};
          border-top: 0;
          border-radius: 0 0 1rem 1rem;
          transform: ${focus ? 'scale(1)' : 'scale(0)'};
          opacity: ${focus ? '1' : '0'};
          transition: all 150ms ease;
          box-shadow: 0 0.5rem 1rem 0.2rem rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
  const getErrorText = () => (
    <div>
      <p>{error}</p>
      <style jsx>{`
        div {
          color: ${colors.orange};
        }
      `}</style>
    </div>
  );

  const getInputByType = () => {
    switch (type) {
      case 'text':
        return <Input type={type} {...rest} />;
      case 'email':
        return <Input type={type} {...rest} autocomplete="email" />;
      case 'textarea':
        return <TextArea name={name} {...rest} />;
      case 'dropdown':
        return <Dropdown name={name} {...rest} />;
    }
  };

  return (
    <div onMouseEnter={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
      {label && <label htmlFor={name}>{getLabelText()}</label>}
      {error && getErrorText()}
      {icon && (
        <i>
          <Icon name={icon} />
        </i>
      )}
      {getInputByType()}
      {info && getInfoText()}
      <style jsx>
        {`
          label {
            text-transform: uppercase;
            font-weight: bold;
            margin: 1rem 0;
          }

          div {
            width: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            background-color: ${colors.white};
            border-radius: 0.3rem;
            margin: 2rem 0;
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
