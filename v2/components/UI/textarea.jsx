import PropTypes from 'prop-types';
import { colors } from '../../assets/styles/constants';

const TextArea = ({ name, placeholder, rows, cols, required, ...rest }) => (
  <>
    <textarea
      name={name}
      placeholder={placeholder}
      required={required}
      rows={rows}
      cols={cols}
      {...rest}
    />
    <style jsx>
      {`
        textarea {
          width: 100%;
          padding: 2rem;
          background: transparent;
          border: 1px solid ${colors.gray};
          border-radius: 1rem;
        }
      `}
    </style>
  </>
);

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  cols: PropTypes.number
};

export default TextArea;
