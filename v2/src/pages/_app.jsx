import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import AuthContext from '../context/auth';
import User from '../models/User';
import { auth } from '../api/firebase';
import { colors } from '../assets/styles';
import Layout from '../components/layout';
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
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={colors.primary} />
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
