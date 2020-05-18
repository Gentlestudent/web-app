import { useContext } from 'react';
import Head from 'next/head';
import AuthContext from '../context/auth';
import { Heading } from '../components/UI';

const Home = () => {
  const { isUserSignedIn, currentUser } = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>Welkom | Gentlestudent</title>
      </Head>
      <Heading level={1} color="#000" title="Aan de slag met Gentlestudent" />
      <Heading level={2} color="#000" title="“Verken je stad, help je buren.”" />
    </>
  );
};

export default Home;
