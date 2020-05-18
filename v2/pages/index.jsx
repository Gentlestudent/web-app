import { useContext } from 'react';
import Head from 'next/head';
import AuthContext from '../context/auth';
import { Heading } from '../components/UI';
import IntroVideo from '../components/introVideo';
import eyecatcher from '../assets/img/home/eyecatcher.jpg';
import { colors } from '../assets/styles/constants';

const Home = () => {
  const { isUserSignedIn, currentUser } = useContext(AuthContext);
  return (
    <div className="scroll-snap">
      <Head>
        <title>Welkom | Gentlestudent</title>
      </Head>
      <section id="one">
        <Heading level={1} color="#fff" title="Aan de slag met Gentlestudent" />
        <Heading level={2} color="#fff" title="“Verken je stad, help je buren.”" />
        <IntroVideo />
      </section>
      <section id="two">{/* learning opportunities */}</section>
      <section id="three">{/* about app + footer */}</section>
      <style jsx>
        {`
          /* TODO: add mandatory y scroll on html element */
          section {
            scroll-snap-align: start;
            min-height: 100vh;
          }

          #one {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-image: url(${eyecatcher});
            background-size: cover;
          }

          #two {
          }

          #three {
            background: ${colors.grayLight};
          }
        `}
      </style>
    </div>
  );
};

export default Home;
