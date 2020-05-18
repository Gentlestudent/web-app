import { useContext } from 'react';
import Head from 'next/head';
import AuthContext from '../context/auth';
import { Heading, Card } from '../components/UI';
import IntroVideo from '../components/introVideo';
import eyecatcher from '../assets/img/home/eyecatcher.jpg';
import { colors, breakpoints } from '../assets/styles/constants';

const MockCard = () => (
  <Card
    image="https://i.picsum.photos/id/757/300/200.jpg"
    title="Gent Zonnestad: presenteer op een infoavond"
    date={new Date().toDateString()}
    description="Verkrijg de intermediate badge wanneer je één keer 
            op een infoavond aanwezig bent, 
            en op één infoavond de presentatie 
            omtrent de groepsaankoop hebt gegeven. 
            (Het presentatiemateriaal is reeds beschikbaar)."
  />
);

const Home = () => {
  const { isUserSignedIn, currentUser } = useContext(AuthContext);
  return (
    <div className="scroll-snap">
      <Head>
        <title>Welkom | Gentlestudent</title>
      </Head>
      <section id="one">
        <Heading level={1} color={colors.white} title="Aan de slag met Gentlestudent" />
        <Heading level={2} color={colors.white} title="“Verken je stad, help je buren.”" />
        <IntroVideo />
      </section>
      <section id="two">
        <Heading level={2} color={colors.gray} title="Leerkansen" />
        <div className="card-group">
          <MockCard />
          <MockCard />
          <MockCard />
        </div>
      </section>
      <section id="three">{/* about app + footer */}</section>
      <style jsx>
        {`
          /* TODO: add mandatory y scroll on html element */
          section {
            scroll-snap-align: start;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          #one {
            background-image: url(${eyecatcher});
            background-size: cover;
            justify-content: center;
            align-items: center;
          }

          #two {
            justify-content: center;
            align-items: center;
          }

          .card-group {
            display: flex;
            padding: 1rem;
            margin: 10rem;
            max-width: 120rem;
          }

          @media (max-width: ${breakpoints.small}) {
            .card-group {
              flex-direction: column;
              margin: 0;
            }
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
