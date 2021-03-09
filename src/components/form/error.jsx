import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import { colors } from '../../assets/styles';

const Error = ({ name }) => (
  <>
    <span className="error">
      <ErrorMessage name={name} />
    </span>

    <style jsx>
      {`
        .error {
          font-size: 1.6rem;
          color: ${colors.sub};
          margin-top: 0.5rem;
        }
      `}
    </style>
  </>
);

Error.propTypes = {
  name: PropTypes.string.isRequired
};

export default Error;
