import { useEffect, useReducer } from 'react';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import AuthContext from '../context/auth';
import User from '../models/User';
import { auth } from '../api/firebase';
import { getProfile } from '../api/users';
import { colors } from '../assets/styles';
import Layout from '../components/layout';
import globalStyles from '../assets/styles/global';
import 'react-quill/dist/quill.snow.css';
import useExec from '../hooks/useExec';

function currentUserReducer(state, [type, payload]) {
  switch (type) {
    case 'auth':
      return payload ? new User(payload) : null;
    case 'data':
      return state ? Object.assign(state, payload) : null;
    default:
      return null;
  }
}

const App = ({ Component, pageProps }) => {
  const [user, authLoading, authError] = useAuthState(auth);
  const [execLoading, execError, data, exec] = useExec(getProfile);
  const [currentUser, dispatch] = useReducer(currentUserReducer, null);
  const loading = authLoading || execLoading;
  const error = authError || execError;

  const reload = () => {
    if (!loading && currentUser) {
      exec(currentUser.id);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      dispatch(['auth', user]);
      if (user) {
        exec(user.uid);
      }
    }
  }, [authLoading, user, exec]);

  useEffect(() => {
    if (!execLoading) {
      dispatch(['data', data]);
    }
  }, [execLoading, data, currentUser]);

  const authState = {
    authStatusReported: !loading,
    isUserSignedIn: !!user,
    error,
    currentUser,
    reload
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={colors.primary} />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AuthContext.Provider value={authState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <style jsx global>
          {globalStyles}
        </style>
      </AuthContext.Provider>
    </>
  );
};

export default App;
