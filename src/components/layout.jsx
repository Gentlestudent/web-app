import PropTypes from 'prop-types';
import Nav from './layout/nav';
import Footer from './layout/footer';
import { breakpoints } from '../assets/styles/constants';

const Layout = ({ /* withHeader, */ children }) => (
  <>
    {/* withHeader && <Header /> */}
    <Nav />
    <div className="page-container">{children}</div>
    <Footer />

    <style jsx>
      {`
        .page-container {
          display: flex;
          flex-direction: column;
        }

        @media (max-width: ${breakpoints.nav}) {
          .page-container {
            margin-top: 8rem;
          }
        }
      `}
    </style>
  </>
);

Layout.propTypes = {
  // withHeader: PropTypes.bool
};

Layout.defaultProps = {
  // withHeader: true
};

export default Layout;
