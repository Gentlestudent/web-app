import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInput } from '../hooks';
import { inputTypes } from '../constants';
import { colors } from '../assets/styles';
import Input from '../components/UI/input';
import TextArea from '../components/UI/textarea';
import Dropdown from '../components/UI/dropdown';
import Icon from '../components/UI/icon';

const FormField = ({
  type,
  name,
  info,
  required,
  label,
  icon,
  error,
  setField,
  value,
  showFeedback: showSubmitFeedback,
  ...rest
}) => {
  const { TEXTAREA, DROPDOWN } = inputTypes;
  const { showFeedback, setShowFeedback, setValue, bind } = useInput('');

  useEffect(() => {
    if (value) setValue(value);
    if (showSubmitFeedback) setShowFeedback(true);
  }, [showSubmitFeedback]);

  const getLabelText = () => `${label}${required ? '*' : ''}`;

  const handleChange = (e) => {
    setField(e.target);
    bind.onChange(e);
  };

  const getInputByType = () => {
    const infoStyle = info && { borderRadius: '0 0 1rem 1rem' };
    switch (type) {
      case TEXTAREA:
        return (
          <TextArea
            name={name}
            value={value}
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
            value={value}
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
            value={value}
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
            {error ? <Icon name="exclamation" /> : <Icon name="check" />}
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
      {<p className="error">{showFeedback && error}</p>}
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
            background: ${error ? colors.orange : colors.green};
            border: 1px solid ${colors.gray};
            opacity: ${showFeedback ? 1 : 0};
            transform: scale(${showFeedback ? 1 : 0});
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
  value: PropTypes.string,
  info: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  required: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  setField: PropTypes.func,
  showFeedback: PropTypes.bool
};

FormField.defaultProps = {
  icon: null
};

export default FormField;
