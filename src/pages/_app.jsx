import PropTypes from 'prop-types';
import Head from 'next/head';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-quill/dist/quill.snow.css';

import AuthContext from '../context/auth';
import { colors } from '../assets/styles';
import Layout from '../components/layout';
import globalStyles from '../assets/styles/global';
import { useAuthState, useProgressBar } from '../hooks';

const App = ({ Component, pageProps }) => {
  const [loading, error, currentUser, reload] = useAuthState();
  useProgressBar(loading);

  const authState = {
    authStatusReported: !loading,
    isUserSignedIn: !!currentUser,
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
