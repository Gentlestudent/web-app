import { useContext } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AuthContext from '../context/auth';
import { Card, Heading, Button } from '../components/UI';
import banner from '../assets/img/home/banner.jpg';
import Container from '../components/container';
import { colors, breakpoints, spacers } from '../assets/styles';

const Home = () => {
  const { isUserSignedIn, currentUser } = useContext(AuthContext);
  const OPPORTUNITIES = [
    {
      title: 'Gent Zonnestad: presenteer op een infoavond',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21',
      badge:
        'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_3.png?alt=media'
    },
    {
      title: 'Nog een titel',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21',
      badge:
        'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_3.png?alt=media'
    },
    {
      title: 'Nog een titel',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21',
      badge:
        'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_3.png?alt=media'
    }
  ];

  return (
    <>
      <div>
        <Head>
          <title>Welkom | Gentlestudent</title>
        </Head>
        <Container>
          <article className="heading">
            <div className="heading-content">
              <div className="heading-text">
                <Heading level={1} title="Aan de slag met Gentlestudent" />
                <p>“Verken je stad, help je buren.”</p>
                <Button text="Bekijk meer" icon="arrow-right" primary />
              </div>
              <div className="heading-video">
                <iframe
                  title="Gentlestudent"
                  width="100%"
                  height="360"
                  src="https://www.youtube.com/embed/F9GbWQECcYw"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen=""
                />
              </div>
            </div>
          </article>
          <article className="oppertunities">
            <section className="cards">
              {OPPORTUNITIES.map((OPPORTUNITY) => (
                <Card
                  key={OPPORTUNITY}
                  badge={OPPORTUNITY.badge}
                  image="https://picsum.photos/200/300"
                  title={OPPORTUNITY.title}
                  description={OPPORTUNITY.description}
                  date={OPPORTUNITY.date}
                  alt={OPPORTUNITY.alt ? OPPORTUNITY.alt : OPPORTUNITY.title}
                />
              ))}
            </section>
            <Button text="Bekijk meer" icon="arrow-right" primary />
          </article>
          <article className="news">
            <Heading level={2} title="Nieuws" />
            <p>Zie wat Gentlestudent heeft te bieden en wat je mag verwachten in de toekomst</p>
            <Button text="Wat is er nieuw?" icon="arrow-right" />
          </article>
        </Container>
        <article>
          <Container>
            <Heading level={2} title="Download de mobile app" />
            <p>
              Om als student zicht te krijgen op waar de leerkansen zich in Gent situeren, kan je de
              Gentlestudent app downloaden. Deze app zal je melden wanneer je in de buurt bent van
              een leerkans. Via de app kan je ook het overzicht bewaren van de leerkansen waar je je
              voor hebt ingeschreven.
            </p>
          </Container>
        </article>
      </div>

      <style jsx>
        {`
          .heading {
            position: relative;
          }

          .heading::before {
            background: url(${banner});
            background-repeat: no-repeat;
            background-size: cover;
            content: '';
            position: absolute;
            height: 60rem;
            width: 100vw;
            z-index: -1;
            left: calc((100vw - 1300px) / -2);
            top: -25rem; // negative heading-text marginTop
          }

          .heading > div {
            position: relative;
            height: 45rem;
            margin-top: 25rem;
          }

          .heading > div::before {
            content: '';
            position: absolute;
            height: 100%;
            width: calc(100% + ((100vw - 1300px) / 2));
            z-index: -1;
            background: ${colors.blueLight};
          }

          .heading-text {
            max-width: 80rem;
            padding: 6rem 10rem 0 8rem;
          }

          .cards {
            display: grid;
            grid-template: 1fr / repeat(3, 1fr);
            grid-gap: ${spacers.medium};
            margin: ${spacers.medium} 0 6rem;
          }

          .heading-content {
            display: flex;
          }

          .heading-video {
            margin-top: 5rem;
            width: 100%;
          }

          .oppertunities {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .news {
            margin-top: 10rem;
            max-width: 45rem;
          }
        `}
      </style>
    </>
  );
};

export default Home;
