import Router from 'next/router';
import { getReadableDate } from '../../api/firebase';
import { routes } from '../../constants';
import Container from '../../components/container';
import { Card, Heading, SearchBackup } from '../../components/UI';
import Map from '../../components/map/map';
import { spacers, colors, breakpoints } from '../../assets/styles/constants';
import { getOpportunities } from '../../api/opportunities';

const Opportunities = ({ opportunities }) => {
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
      title: 'Nog een titel 2',
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
      <Container>
        <>
          <div className="heading">
            <Heading title="Leerkansen" level={1} />
            <SearchBackup name="search" placeholder="Zoeken" type="search" />
          </div>
          <div className="map-wrapper">
            <Map />
          </div>
          <article className="cards">
            {opportunities.map((opp) => (
              <Card
                onClick={() => Router.push(`${routes.OPPORTUNITIES}/${opp.id}`)}
                key={opp.id}
                badge={opp.badge}
                image="https://picsum.photos/200/300"
                title={opp.title}
                description={opp.description}
                date={opp.date}
                alt={opp.alt ? opp.alt : opp.title}
              />
            ))}
          </article>
        </>
      </Container>
      <style jsx>
        {`
          .cards {
            display: grid;
            grid-template: 1fr 1fr / repeat(3, 1fr);
            grid-gap: ${spacers.medium};
            margin: ${spacers.medium} 0 6rem;
          }

          .heading {
            display: flex;
            justify-content: space-between;
            margin: 3rem 0 0;
          }

          .map-wrapper {
            background: ${colors.blueLight};
            height: 50rem;
          }

          @media (max-width: ${breakpoints.medium}) {
            .cards {
              grid-template: 1fr 1fr / repeat(2, 1fr);
            }

            .heading {
              flex-direction: column;
              margin-bottom: 2rem;
              align-items: start;
            }
          }

          @media (max-width: ${breakpoints.small}) {
            .cards {
              grid-gap: ${spacers.small};
            }
          }

          @media (max-width: ${breakpoints.extraSmall}) {
            .cards {
              grid-template: 1fr 1fr / repeat(1, 1fr);
            }
          }
        `}
      </style>
    </>
  );
};

export const getStaticProps = async () => {
  const opportunitiesFromDb = await getOpportunities();
  const opportunities = opportunitiesFromDb.map((opp) => {
    opp.beginDate = getReadableDate(opp.beginDate);
    opp.endDate = getReadableDate(opp.endDate);
    return opp;
  });

  return {
    props: { opportunities }
    // revalidate: 900
  };
};

export default Opportunities;
