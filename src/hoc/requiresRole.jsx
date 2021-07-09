import Error from 'next/error';
import useAuth from '../hooks/useAuth';
import hasRole from '../utils/hasRole';

const requiresRole = (Component, role) => (props) => {
  const { authStatusReported, isUserSignedIn, currentUser } = useAuth();
  if (!authStatusReported) {
    // TODO show loading icon
    return <div>loading</div>
  }
  if (isUserSignedIn && hasRole(currentUser, role)) {
    return <Component {...props} />;
  }
  return <Error statusCode={404} />;
};

export default requiresRole;
