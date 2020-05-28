import PropTypes from 'prop-types';
import { inputTypes } from '../../constants';

import { Input, TextArea, Dropdown } from '.';

import { colors } from '../../assets/styles/constants';
import Icon from './icon';

const { TEXTAREA, DROPDOWN } = inputTypes;

const FormGroup = ({ type, name, info, required, label, icon, error, ...rest }) => {
  const getLabelText = () => `${label}${required ? '*' : ''}`;

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
      case TEXTAREA:
        return <TextArea name={name} required={required} {...rest} style={style} />;
      case DROPDOWN:
        return <Dropdown name={name} required={required} {...rest} style={style} />;
      default:
        return <Input type={type} name={name} required={required} {...rest} style={style} />;
    }
  };

  return (
    <div className="form-field">
      <div className="field-header">
        {label && <label htmlFor={name}>{getLabelText()}</label>}
        {info && (
          <p>
            {!required && 'Optioneel: '}
            {info}
          </p>
        )}
      </div>
      {icon && (
        <i>
          <Icon name={icon} />
        </i>
      )}
      {getInputByType()}
      {error && getErrorText()}
      <style jsx>
        {`
          .field-header {
            padding: 2rem;
            background: ${colors.grayLight};
            border: 1px solid ${colors.gray};
            border-bottom: 0;
            border-radius: 1rem 1rem 0 0;
          }

          label {
            text-transform: uppercase;
            font-weight: bold;
          }

          .form-field {
            display: flex;
            flex-direction: column;
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
  info: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  required: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string
};

FormGroup.defaultProps = {
  icon: null
};

export default FormGroup;
