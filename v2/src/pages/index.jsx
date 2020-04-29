import { useContext } from 'react';
import Head from 'next/head';
import AuthContext from '../context/auth';

const Home = () => {
  const { isUserSignedIn, currentUser } = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>Welkom | Gentlestudent</title>
      </Head>
      <main>Hello</main>
    </>
  );
};

export default Home;
