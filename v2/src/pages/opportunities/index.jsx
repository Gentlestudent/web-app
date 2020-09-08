import Router from 'next/router';
import Link from 'next/link';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { firestore } from '../../api/firebase';
import { routes } from '../../constants';
import { Card, Heading } from '../../components/UI';
import { spacers } from '../../assets/styles/constants';

export default () => {
  /*
   * TODO: Only fetch opportunities of specific issuer
   */

  const [value, loading, error] = useCollectionOnce(firestore.collection('Opportunities'));

  const OPPORTUNITIES = [
    {
      title: 'Gent Zonnestad: presenteer op een infoavond',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21'
    },
    {
      title: 'Nog een titel',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21'
    },
    {
      title: 'Nog een titel',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21'
    },
    {
      title: 'Nog een titel',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21'
    },
    {
      title: 'Nog een titel',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21'
    }
  ];

  return (
    <>
      <Link href={routes.issuer.CREATE_OPPORTUNITY}>Create new opportunity</Link>
      {value &&
        value.docs.map((doc) => {
          const { title } = doc.data();
          const { id } = doc;
          return (
            !loading && (
              <div
                key={id}
                onClick={() =>
                  Router.push(routes.issuer.OPPORTUNITY, `${routes.issuer.OPPORTUNITIES}/${id}`)
                }
              >
                {title}
              </div>
            )
          );
        })}

      <div className="container">
        <Heading title="Leerkansen" level={1} />
        <article className="cards">
          {OPPORTUNITIES.map((OPPORTUNITY) => (
            <Card
              key={OPPORTUNITY}
              image="https://picsum.photos/200/300"
              title={OPPORTUNITY.title}
              description={OPPORTUNITY.description}
              date={OPPORTUNITY.date}
              alt={OPPORTUNITY.alt ? OPPORTUNITY.alt : OPPORTUNITY.title}
            />
          ))}
        </article>
      </div>

      <style jsx>
        {`
          .container {
            max-width: 1400px;
            padding: 0 50px;
            margin: 0 auto;
          }

          .cards {
            display: grid;
            grid-template: 1fr 1fr / repeat(3, 1fr);
            grid-gap: ${spacers.medium};

            margin: 40px 0 60px;
          }
        `}
      </style>
    </>
  );
};