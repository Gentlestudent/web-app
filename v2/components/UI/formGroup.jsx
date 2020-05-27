import PropTypes from 'prop-types';

import { Input, TextArea, Dropdown } from '.';

import { colors } from '../../assets/styles/constants';
import Icon from './icon';

const FormGroup = ({ type, name, info, required, label, icon, error, ...rest }) => {
  const getLabelText = () => `${label}${required ? '*' : ''}`;
  const getInfoText = () => (
    <div>
      <p>
        {required ? '' : 'Optioneel: '}
        {info}
      </p>
      <style jsx>
        {`
          div {
            padding: 0.5rem 2rem;
            background: ${colors.grayLight};
            border: 1px solid ${colors.gray};
            border-bottom: 0;
            border-radius: 1rem 1rem 0 0;
          }
        `}
      </style>
    </div>
  );
  const getErrorText = () => (
    <p>
      {error}
      <style jsx>
        {`
          p {
            padding: 0 2rem;
            color: ${colors.orange};
          }
        `}
      </style>
    </p>
  );

  const getInputByType = () => {
    const style = info && { borderRadius: '0 0 1rem 1rem' };
    switch (type) {
      case 'textarea':
        return <TextArea name={name} required={required} {...rest} style={style} />;
      case 'dropdown':
        return <Dropdown name={name} required={required} {...rest} style={style} />;
      default:
        return <Input type={type} name={name} required={required} {...rest} style={style} />;
    }
  };

  return (
    <div>
      {label && <label htmlFor={name}>{getLabelText()}</label>}
      {info && getInfoText()}
      {icon && (
        <i>
          <Icon name={icon} />
        </i>
      )}
      {getInputByType()}
      {error && getErrorText()}
      <style jsx>
        {`
          label {
            text-transform: uppercase;
            font-weight: bold;
            margin: 2rem;
          }

          div {
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
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string
};

FormGroup.defaultProps = {
  icon: null
};

export default FormGroup;
