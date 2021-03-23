import PropTypes from 'prop-types';

const Label = ({ label, name, children, inline }) => (
  <>
    <label className={`label ${inline && 'label--inline'}`} htmlFor={name}>
      <span>{label || ''}</span>
      {children && children}
    </label>

    <style jsx>
      {`
        .label {
          font-weight: bold;
        }

        .label--inline {
          font-weight: normal;
          display: flex;
          flex-direction: row-reverse;
        }

        .label--inline span {
          margin-left: 1rem;
        }
      `}
    </style>
  </>
);

Label.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Label;
