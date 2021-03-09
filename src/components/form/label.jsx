import PropTypes from 'prop-types';

const Label = ({ label, name }) => (
  <>
    <label className="label" htmlFor={name}>
      {label || ''}
    </label>

    <style jsx>
      {`
        .label {
          font-weight: bold;
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
