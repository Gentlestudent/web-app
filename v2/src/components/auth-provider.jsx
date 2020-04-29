import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AuthContext from '../context/auth';
import { createAuthSubscription } from '../api/auth';

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    authStatusReported: false,
    isUserSignedIn: false,
    currentUser: null
  });

  useEffect(() => {
    createAuthSubscription((user) => {
      setAuthState({ ...authState, authStatusReported: true });
      if (!user) return;
      setAuthState({
        ...authState,
        isUserSignedIn: true,
        currentUser: user
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {authState.authStatusReported && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
