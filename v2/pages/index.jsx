import Head from 'next/head';
import GlobalStyles from '@/styles/global';

const Home = () => (
  <div className="container">
    <Head>
      <title>Gentlestudent</title>
    </Head>
    <main>Hello world</main>
    <GlobalStyles />
  </div>
);

export default Home;
