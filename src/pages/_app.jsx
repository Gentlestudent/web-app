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

const App = ({ Component, pageProps }) => {
  const [user, loading, error] = useAuthState(auth);
  let currentUser = null;

  if (!loading && user) {
    currentUser = new User(user);
    getProfile(currentUser.id).then((data) => {
      Object.assign(currentUser, data);
    });
  }

  console.log(currentUser);

  const authState = {
    authStatusReported: !loading,
    isUserSignedIn: !!user,
    currentUser
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
