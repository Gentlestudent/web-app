import PropTypes from 'prop-types';
import { breakpoints } from '../../assets/styles/constants';

const Container = ({ text, children }) => (
  <>
    <div className="container">
      {text ? <div className="container-text">{children}</div> : children}
    </div>
    <style jsx>
      {`
        .container {
          max-width: 1400px;
          padding: 0 5rem;
          margin: 0 auto;
          height: 100%;
          width: 100%;
        }

        .container-text {
          width: 65%;
        }

        @media (max-width: 900px) {
          .container {
            padding: 0 3rem;
          }

          .container-text {
            width: 100%;
          }
        }

        @media (max-width: ${breakpoints.small}) {
          .container {
            padding: 0 2rem;
          }
        }
      `}
    </style>
  </>
);

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  text: PropTypes.bool
};

export default Container;
