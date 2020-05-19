import { useContext } from 'react';
import Head from 'next/head';
import AuthContext from '../../context/auth';
import { Heading, Card } from '../../components/UI';
import IntroVideo from './introVideo';
import eyecatcher from '../../assets/img/home/eyecatcher.jpg';
import whatsNew from '../../assets/img/home/wat-is-er-nieuw.png';
import Download from './download';
import { colors, breakpoints } from '../../assets/styles/constants';

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
    alt="Gent Zonnestad presentatie"
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
      <section id="three">
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
      <style jsx>
        {`
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
            margin: 8rem;
            max-width: 100rem;
          }

          @media (max-width: ${breakpoints.small}) {
            .card-group {
              flex-direction: column;
              margin: 0;
            }
          }

          #three {
            background: ${colors.grayLight};
            color: #fff;
          }

          .whats-new {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-image: url(${whatsNew});
            background-size: cover;
          }

          .content {
            max-width: 100rem;
          }

          .spacer {
            height: 10rem;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
