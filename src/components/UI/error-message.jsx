import PropTypes from 'prop-types';
import getErrorMessage from '../../utils/getErrorMessage';

const ErrorMessage = ({ code }) => {
  return (
    <>
      {code && <div>{getErrorMessage(code)}</div>}
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
