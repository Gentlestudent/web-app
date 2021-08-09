import Error from 'next/error';
import useAuth from '../hooks/useAuth';
import { hasRole } from '../utils';
import { LoadingSpinner } from '../components/UI';

const requiresMissingRole = (Component, role) => (props) => {
  const { authStatusReported, isUserSignedIn, currentUser } = useAuth();
  if (!authStatusReported) {
    return <div><LoadingSpinner /></div>
  }
  if (!isUserSignedIn || (isUserSignedIn && !hasRole(currentUser, role))) {
    return <Component {...props} />;
  }
  return <Error statusCode={404} />;
};

export default requiresMissingRole;
