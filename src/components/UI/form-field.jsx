import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInput } from '../../hooks';
import { inputTypes } from '../../constants';
import { colors } from '../../assets/styles';
import Input from '../../backup/input';
import TextArea from './textarea';
import Dropdown from './dropdown';
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
          <>
            <Input
              className={`input-${type}`}
              type={type}
              name={name}
              value={value}
              required={required}
              // {...rest}
              // style={infoStyle}
              // {...bind}
              // onChange={handleChange}
            />
            {type === 'checkbox' ? <span className="checkbox" /> : ''}
          </>
        );
    }
  };

  return (
    <div className={`form-field form-field-${type}`}>
      {label && <label htmlFor={name}>{getLabelText()}</label>}

      {icon && (
        <i className="field-icon">
          <Icon name={icon} />
        </i>
      )}
      {getInputByType()}
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
            justify-content: center;
            width: 100%;
          }

          .field-icon {
            color: ${colors.blue};
            position: absolute;
            margin-left: 1.5rem;
            z-index: 2;
          }

          .form-field-checkbox {
            display: flex;
            flex-direction: row-reverse;
          }

          .input-checkbox {
            position: absolute;
            opacity: 0 !important;
            cursor: pointer;
          }

          .checkbox {
            width: 2.3rem;
            height: 2.3rem;
            display: inline-block;
            position: relative;
            margin-right: 1rem;
            background-color: white;
            border: 0.1rem solid ${colors.border};
          }

          input[type='checkbox']:checked + span {
            background-color: ${colors.orange};
            border: 0.1rem solid ${colors.orange};
          }

          input[type='checkbox']:checked + span::after {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            top: -0.2rem;
            left: -0.3rem;
            border-bottom: 2px solid transparent;
            border-left: 2px solid transparent;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            -webkit-transform-origin: 18px -1px;
            transform-origin: 18px -1px;
            width: 13px;
            height: 8px;
            border-color: white;
            -webkit-transition: height 0.08s ease-out, width 0.08s ease-out 0.1s;
            transition: height 0.08s ease-out, width 0.08s ease-out 0.1s;
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
