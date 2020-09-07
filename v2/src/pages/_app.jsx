import { useAuthState } from 'react-firebase-hooks/auth';
import AuthContext from '../context/auth';
import Nav from '../components/header';
import User from '../models/User';
import { auth } from '../api/firebase';

import globalStyles from '../assets/styles/global';

const App = ({ Component, pageProps }) => {
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  const authState = {
    authStatusReported: !loading,
    isUserSignedIn: !!user,
    currentUser: user ? new User(user) : null
  };

  return (
    <>
      <AuthContext.Provider value={authState}>
        <Component {...pageProps} />
        <style jsx global>
          {globalStyles}
        </style>
      </AuthContext.Provider>
    </>
  );
};

export default App;
