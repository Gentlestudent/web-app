import PropTypes from 'prop-types';
import fromErrorCodeToMessage from '../../utils/from-error-code-to-message';

const ErrorMessage = ({ code }) => {
  return (
    <>
      {code && <div>{fromErrorCodeToMessage(code)}</div>}
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
