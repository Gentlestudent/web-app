import Router from 'next/router';
import { routes } from '../../constants';
import { Container } from '../../components/layout/index';
import Map from '../../components/map/map';
import { Card, Heading, Search, LoadingSpinner } from '../../components/UI';
import { spacers, colors, breakpoints } from '../../assets/styles/constants';
import { useOpportunities, useErrorNotifier } from '../../hooks';
import { getBase64AsDataUrl } from '../../utils';

const Opportunities = () => {
  const [errorOpportunities, loadingOpportunities, opportunities] = useOpportunities();

  useErrorNotifier([errorOpportunities]);

  return (
    <>
      <Container>
        <>
          <div className="heading">
            <Heading title="Leerkansen" level={1} />

            <Search name="search" placeholder="Zoeken" type="search" />
          </div>

          <div className="map-wrapper">
            <Map opportunities={opportunities?.data || []} />
          </div>

          <article className="cards">
            {loadingOpportunities && <LoadingSpinner />}
            {(opportunities?.data || []).map((opportunity) => (
              <Card
                onClick={() => Router.push(`${routes.OPPORTUNITIES}/${opportunity.id}`)}
                key={opportunity.id}
                id={opportunity.id}
                badge={getBase64AsDataUrl(opportunity.pinImage)}
                image={getBase64AsDataUrl(opportunity.oppImage)}
                title={opportunity.title}
                description={opportunity.shortDescription}
                date={`${opportunity.beginDate || '-'} tot en met ${opportunity.endDate || '-'}`}
                alt={opportunity.alt ? opportunity.alt : opportunity.title}
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

export default Opportunities;
