import { useAuthState } from 'react-firebase-hooks/auth';
import Nav from '../components/header';
import { auth } from '../api/firebase';

import globalStyles from '../assets/styles/global';

const App = ({ Component, pageProps }) => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
};

export default App;
