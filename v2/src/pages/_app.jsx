import AuthProvider from '../components/auth-provider';
import globalStyles from '../styles/global';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <AuthProvider>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </AuthProvider>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
};

export default App;
