import Router from 'next/router';
import { Container } from '../../components/layout/index';
import { spacers } from '../../assets/styles/constants';
import { Card, Heading } from '../../components/UI';
import { routes } from '../../constants';

export default function News() {
  const news = [
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
        <Heading title="Nieuws" level={1} marginTop />
        <article className="news-items">
          {news.map((item) => (
            <Card
              onClick={() => Router.push(`${routes.NEWS}/id`)}
              key={item}
              image="https://picsum.photos/200/300"
              title={item.title}
              description={item.description}
              date={item.date}
              alt={item.alt ? item.alt : item.title}
              row
            />
          ))}
        </article>
      </Container>
      <style jsx>
        {`
          .heading {
            display: flex;
            justify-content: space-between;
            margin: 3rem 0 0;
          }

          .news-items > * {
            display: flex;
            flex-direction: column;
            margin-bottom: 2rem;
            // margin: ${spacers.medium} 0 6rem;
          }
        `}
      </style>
    </>
  );
}
