import { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useAuthState } from 'react-firebase-hooks/auth';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-quill/dist/quill.snow.css';

import AuthContext from '../context/auth';
import User from '../models/User';
import { auth } from '../api/firebase';
import { getProfile } from '../api/users';
import { colors } from '../assets/styles';
import Layout from '../components/layout';
import globalStyles from '../assets/styles/global';
import useExec from '../hooks/useExec';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function currentUserReducer(state, [type, payload]) {
  switch (type) {
    case 'auth':
      return payload ? new User(payload) : null;
    case 'data':
      return state ? Object.assign(new User(state), payload) : null;
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
  }, [execLoading, data]);

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
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
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

App.propTypes = {
  Component: PropTypes.elementType,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.any
};

export default App;
