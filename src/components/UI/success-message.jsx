import PropTypes from 'prop-types';

const SuccessMessage = ({ message }) => {
  return (
    <>
      {message && <div>{message}</div>}
      <style jsx>
        {`
          div {
            padding-bottom: 20px;
          }
        `}
      </style>
    </>
  );
};

SuccessMessage.propTypes = {
  message: PropTypes.string
};

export default SuccessMessage;
