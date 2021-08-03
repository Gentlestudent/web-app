import { useMemo } from 'react';
import Router from 'next/router';
import { spacers, colors, breakpoints } from '../../assets/styles/constants';
import { Button, Heading, BannerSplit, Card } from '../../components/UI';
import { Container } from '../../components/layout/index';
import { routes, roles } from '../../constants';
import requiresRole from '../../hoc/requiresRole';
import { useOpportunities, useAuth, useParticipations, useAssertions } from '../../hooks';
import { getBase64AsDataUrl } from '../../utils';

const Dashboard = () => {
  const { currentUser } = useAuth();

  const opportunitiesOptions = useMemo(() => ({ searchParams: { authority: [0, 1], issuer: currentUser?.issuer?.id } }), [currentUser]);
  const opportunitiesCountOptions = useMemo(() => ({ searchParams: { count: true, authority: [0, 1], issuer: currentUser?.issuer?.id } }), [currentUser]);
  const [errorOpportunities, loadingOpportunities, opportunities] = useOpportunities([], opportunitiesOptions);
  const [errorOpportunitiesCount, loadingOpportunitiesCount, opportunitiesCount] = useOpportunities(0, opportunitiesCountOptions);

  const participationsOptions = useMemo(() => ({ searchParams: { opportunities: opportunities?.map(({ id }) => id) || [0] } }), [opportunities]);
  const participationsCountOptions = useMemo(() => ({ searchParams: { count: true, opportunities: opportunities?.map(({ id }) => id) || [0] } }), [opportunities]);
  const [errorParticipations, loadingParticipations, participations] = useParticipations([], participationsOptions);
  const [errorParticipationsCount, loadingParticipationsCount, participationsCount] = useParticipations(0, participationsCountOptions);

  const assertionsOptions = useMemo(() => ({ searchParams: { badges: opportunities?.map(({ badgeId }) => badgeId) || [0] } }), [opportunities]);
  const assertionsCountOptions = useMemo(() => ({ searchParams: { count: true, badges: opportunities?.map(({ badgeId }) => badgeId) || [0] } }), [opportunities]);
  const [errorAssertions, loadingAssertions, assertions] = useAssertions([], assertionsOptions);
  const [errorAssertionsCount, loadingAssertionsCount, assertionsCount] = useAssertions(0, assertionsCountOptions);

  // TODO handle error & show loading

  const mappedParticipations = new Map();
  participations.forEach(participation => {
    mappedParticipations.set(participation.OpportunityId, [...mappedParticipations.get(participation.OpportunityId) || [], participation]);
  });

  const mappedAssertions = new Map();
  assertions.forEach(assertion => {
    mappedAssertions.set(assertion.badgeId, [...mappedAssertions.get(assertion.badgeId) || [], assertion]);
  });

  return (
    <>
      <BannerSplit>
        <div>
          <Heading title={`Aangemaakte leerkansen: ${opportunitiesCount}`} level={2} color="white" />
          <Heading title={`Inschrijvingen: ${participationsCount}`} level={2} color="white" />
          <Heading title={`Aangemaakte badges: ${assertionsCount}`} level={2} color="white" />
          <Button text="Leerkans aanmaken" primary href={routes.issuer.CREATE_OPPORTUNITY} />
        </div>
      </BannerSplit>
      <Container>
        <article className="opportunities">
          {opportunities.map((opportunity) => {
            const myParticipations = mappedParticipations.get(opportunity.id) || [];
            const myAssertions = mappedAssertions.get(opportunity.badgeId) || [];
            return (
              <Card
                onClick={() => Router.push(`${routes.OPPORTUNITIES}/${opportunity.id}`)}
                key={opportunity.id}
                id={opportunity.id}
                badge={getBase64AsDataUrl(opportunity.pinImage)}
                image={getBase64AsDataUrl(opportunity.oppImage)}
                title={opportunity.title}
                description={`Inschrijvingen: ${myParticipations.length} - Badges: ${myAssertions.length}`}
                date={`${opportunity.beginDate || '-'} tot en met ${opportunity.endDate || '-'}`}
                alt={opportunity.alt ? opportunity.alt : opportunity.title}
              />
            );
          })}
        </article>
      </Container>

      <style jsx>
        {`
          .opportunities {
            display: grid;
            grid-template: auto / repeat(3, 1fr);
            grid-gap: ${spacers.medium};
            margin: ${spacers.medium} 0 6rem;
          }

          @media (max-width: ${breakpoints.medium}) {
            .opportunities {
              grid-template: 1fr 1fr / repeat(2, 1fr);
            }
          }

          @media (max-width: ${breakpoints.small}) {
            .opportunities {
              grid-gap: ${spacers.small};
            }
          }

          @media (max-width: ${breakpoints.extraSmall}) {
            .opportunities {
              grid-template: 1fr 1fr / repeat(1, 1fr);
            }
          }
        `}
      </style>
    </>
  );
};

Dashboard.propTypes = {};

export default requiresRole(Dashboard, roles.ISSUER);
