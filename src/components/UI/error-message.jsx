import PropTypes from 'prop-types';
import { errorCodes, errorMessages } from '../../constants';

const ErrorMessage = ({ code }) => {
  const message = errorCodes[code] ? errorMessages[code] : code;

  return (
    <>
      {message && <div>{message}</div>}
      <style jsx>
        {`
          div {
            padding: 10px 10px;
            background-color: yellow;
            margin: 10px 0;
          }
        `}
      </style>
    </>
  );
};

ErrorMessage.propTypes = {
  code: PropTypes.string
};

export default ErrorMessage;
