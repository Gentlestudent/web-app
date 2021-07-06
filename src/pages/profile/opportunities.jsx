import Router from 'next/router';
import { Container } from '../../components/layout/index';
import { Card, Heading } from '../../components/UI';
import { routes } from '../../constants';
import { spacers, colors, breakpoints } from '../../assets/styles/constants';
import { useOpportunities, usePrivateRoute } from '../../hooks';

const MyOpportunities = () => {
  usePrivateRoute();
  const [errorOpportunities, loadingOpportunities, opportunities] = useOpportunities();
  // TODO handle error & show loading

  return (
    <>
      <Container>
        <>
          <Heading title="Leerkansen" level={1} marginTop />
          <article className="cards">
            {opportunities.map((opportunity) => (
              <Card
                onClick={() => Router.push(`${routes.OPPORTUNITIES}/${opportunity.id}`)}
                key={opportunity.id}
                id={opportunity.id}
                badge={opportunity.pinImageUrl}
                image={opportunity.oppImageUrl}
                title={opportunity.title}
                description={opportunity.shortDescription}
                date={`${opportunity.beginDate} tot en met ${opportunity.endDate}`}
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
            grid-template: auto / repeat(3, 1fr);
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

export default MyOpportunities;
