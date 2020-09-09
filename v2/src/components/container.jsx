import PropTypes from 'prop-types';
import { spacers, breakpoints } from '../assets/styles/constants';

const Container = ({ children }) => (
  <div className="container">
    {children}
    <style jsx>
      {`
        .container {
          max-width: 1400px;
          padding: 0 5rem;
          margin: 0 auto;
          height: 100%;
        }

        @media (max-width: 900px) {
          .container {
            padding: 0 3rem;
          }
        }

        @media (max-width: ${breakpoints.small}) {
          .cards {
            grid-gap: ${spacers.small};
          }

          .container {
            padding: 0 2rem;
          }
        }
      `}
    </style>
  </div>
);

Container.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

export default Container;
