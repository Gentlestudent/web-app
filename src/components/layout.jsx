import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Nav from './layout/nav';
import Footer from './layout/footer';
import { breakpoints } from '../assets/styles/constants';
import { useAuth } from '../hooks';
import { routes } from '../constants';

const privateRoutes = new Set([routes.user.EDIT_PROFILE, routes.user.PROFILE]);
const unauthRoutes = new Set([routes.LOGIN]);

const Layout = ({ /* withHeader, */ children }) => {
  const { isUserSignedIn, authStatusReported } = useAuth();
  const router = useRouter();

  const display = () => {
    const { pathname } = router;

    if (privateRoutes.has(pathname)) {
      return authStatusReported && isUserSignedIn;
    }

    if (unauthRoutes.has(pathname)) {
      return authStatusReported && !isUserSignedIn;
    }

    return authStatusReported;
  };
  return (
    <div className="page">
      {/* withHeader && <Header /> */}
      <Nav />
      <div className="page-container">{children}</div>
      <Footer />

      <style jsx>
        {`
          .page {
            display: ${display() ? 'block' : 'none'};
          }

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
    </div>
  );
};

Layout.propTypes = {
  // withHeader: PropTypes.bool
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

Layout.defaultProps = {
  // withHeader: true
};

export default Layout;
