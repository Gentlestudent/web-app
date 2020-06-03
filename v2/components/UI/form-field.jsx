import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInput } from '../../hooks';
import { inputTypes } from '../../constants';
import { colors } from '../../assets/styles';
import { Input, TextArea, Dropdown } from '.';
import Icon from './icon';

const FormField = ({
  type,
  name,
  info,
  required,
  label,
  icon,
  error,
  setField,
  submitting,
  ...rest
}) => {
  const { TEXTAREA, DROPDOWN } = inputTypes;
  const { showError, setShowError, bind } = useInput('');

  useEffect(() => {
    if (submitting) setShowError(true);
  }, [submitting]);

  const getLabelText = () => `${label}${required ? '*' : ''}`;

  const handleChange = (value) => {
    setField(value.target);
    bind.onChange(value);
  };

  const getInputByType = () => {
    const infoStyle = info && { borderRadius: '0 0 1rem 1rem' };
    switch (type) {
      case TEXTAREA:
        return (
          <TextArea
            name={name}
            required={required}
            {...rest}
            style={infoStyle}
            {...bind}
            onChange={handleChange}
          />
        );
      case DROPDOWN:
        return (
          <Dropdown
            name={name}
            required={required}
            {...rest}
            style={infoStyle}
            {...bind}
            onChange={handleChange}
          />
        );
      default:
        return (
          <Input
            type={type}
            name={name}
            required={required}
            {...rest}
            style={infoStyle}
            {...bind}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <div className="form-field">
      <div className="field-header">
        <div className="error-badge">
          <i className="error-icon">
            <Icon name="exclamation" />
          </i>
        </div>
        {label && <label htmlFor={name}>{getLabelText()}</label>}
        {info && (
          <p>
            {!required && 'Optioneel: '}
            {info}
          </p>
        )}
      </div>
      {icon && (
        <i className="fieldIcon">
          <Icon name={icon} />
        </i>
      )}
      {getInputByType()}
      {<p className="error">{showError && error}</p>}
      <style jsx>
        {`
          .field-header {
            padding: 0 4rem 1rem 2rem;
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
          }

          .field-icon {
            color: ${colors.copy};
          }

          .error-badge {
            position: relative;
            display: flex;
            width: 3rem;
            height: 3rem;
            background: red;
            top: -1.5rem;
            left: -0.5rem;
            border-radius: 50%;
            background: ${colors.orange};
            border: 1px solid ${colors.gray};
            opacity: ${showError && error ? 1 : 0};
            transform: scale(${showError && error ? 1 : 0});
            transition: 150ms ease;
          }

          .error-icon {
            color: ${colors.white};
            margin: auto;
          }

          .error {
            min-height: 4rem;
            padding: 0 2rem;
            color: ${colors.orange};
          }
        `}
      </style>
    </div>
  );
};

FormField.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  required: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string
};

FormField.defaultProps = {
  icon: null
};

export default FormField;
