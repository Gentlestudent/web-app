import PropTypes from 'prop-types';
import Header from './header';

const Layout = ({ /* withHeader, */ children }) => (
  <>
    {/* withHeader && <Header /> */}
    <Header />
    <div className="page-container">{children}</div>
    <style jsx>
      {`
        .page-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          margin-top: 2rem;
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
