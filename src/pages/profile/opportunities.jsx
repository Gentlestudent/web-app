import Router from 'next/router';
import { useMemo } from 'react';
import { Container } from '../../components/layout/index';
import { Card, Heading } from '../../components/UI';
import { routes } from '../../constants';
import { spacers, colors, breakpoints } from '../../assets/styles/constants';
import { useParticipations, usePrivateRoute, useAuth } from '../../hooks';
import { getBase64AsDataUrl } from '../../utils';

const MyOpportunities = () => {
  const { currentUser } = useAuth();
  usePrivateRoute();
  const options = useMemo(() => ({ searchParams: { user: currentUser?.id } }), [currentUser]);
  const [participationsError, participationsLoading, participations] = useParticipations({}, options);
  // TODO handle error & show loading

  return (
    <>
      <Container>
        <>
          <Heading title="Leerkansen" level={1} marginTop />
          <article className="cards">
            {(participations?.data || []).map((participation) => (
              <Card
                onClick={() => Router.push(`${routes.OPPORTUNITIES}/${participation.Opportunity.id}`)}
                key={participation.Opportunity.id}
                id={participation.Opportunity.id}
                badge={getBase64AsDataUrl(participation.Opportunity.pinImage)}
                image={getBase64AsDataUrl(participation.Opportunity.oppImage)}
                title={participation.Opportunity.title}
                description={participation.Opportunity.shortDescription}
                date={`${participation.Opportunity.beginDate || '-'} tot en met ${participation.Opportunity.endDate || '-'}`}
                alt={participation.Opportunity.alt ? participation.Opportunity.alt : participation.Opportunity.title}
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
