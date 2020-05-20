import PropTypes from 'prop-types';
import { colors } from '../../assets/styles/constants';

const TextArea = ({ name, placeholder, rows, cols, required }) => (
  <>
    <textarea name={name} placeholder={placeholder} required={required} rows={rows} cols={cols} />
    <style jsx>{`
      textarea {
        padding: 2rem;
        background: transparent;
        border: 1px solid ${colors.gray};
        width: 100%;
        border-radius: 1rem;
      }
    `}</style>
  </>
);

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool
};

TextArea.defaultProps = {
  rows: 3
};

export default TextArea;
