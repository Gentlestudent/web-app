import { useContext } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AuthContext from '../context/auth';
import { Heading } from '../components/UI';
import Layout from '../components/layout';
import IntroVideo from './index/introVideo';
import eyecatcher from '../assets/img/home/eyecatcher.jpg';
import whatsNew from '../assets/img/home/wat-is-er-nieuw.png';
import Download from './index/download';
import Cards from './index/cards';
import { colors, breakpoints } from '../assets/styles';

const Home = () => {
  const { isUserSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>
      <div>
        <Head>
          <title>Welkom | Gentlestudent</title>
        </Head>
        <section className="one">
          <Heading level={1} color={colors.white} title="Aan de slag met Gentlestudent" />
          <Heading level={2} color={colors.white} title="“Verken je stad, help je buren.”" />
          <IntroVideo />
        </section>
        <section className="two">
          <Heading level={2} color={colors.gray} title="Leerkansen" />
          <Cards />
          <Link href="/opportunities">
            <a className="see-more">Meer leerkansen</a>
          </Link>
        </section>
        <section className="three">
          <div className="whats-new">
            <div className="content">
              <Heading
                level={2}
                color={colors.white}
                title="
            Zie wat Gentlestudent heeft te bieden en wat je mag verwachten in de toekomst"
              />
              <a href="#">Wat is er nieuw?</a>
            </div>
          </div>
          <div className="spacer" />
          <Download />
        </section>
      </div>

      <style jsx>
        {`
          section {
            display: flex;
            flex-direction: column;
          }

          .one {
            background-image: url(${eyecatcher});
            background-size: cover;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }

          .two {
            justify-content: center;
            align-items: center;
            padding: 2rem;
          }

          @media (max-width: ${breakpoints.small}) {
            .card-group {
              flex-direction: column;
              margin: 0;
            }
          }

          .whats-new {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-image: url(${whatsNew});
            background-size: cover;
            background-color: #000;
            padding: 10vh 0;
            margin-bottom: 10rem;
          }

          .see-more {
            margin: 2rem auto;
            border-bottom: 2px solid ${colors.primary};
            color: ${colors.gray};
            font-size: 2.1rem;
            font-weight: bold;
          }

          .content {
            max-width: 100rem;
          }
        `}
      </style>
    </>
  );
};

export default Home;
