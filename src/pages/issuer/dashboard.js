import { useMemo } from 'react';
import Router from 'next/router';
import { spacers, breakpoints } from '../../assets/styles/constants';
import { Button, BannerSplit, Card, LoadingSpinner } from '../../components/UI';
import { Container } from '../../components/layout/index';
import { routes, roles } from '../../constants';
import requiresRole from '../../hoc/requiresRole';
import { useOpportunities, useAuth, useParticipations, useAssertions, useErrorNotifier } from '../../hooks';
import { getBase64AsDataUrl } from '../../utils';

const Dashboard = () => {
  const { currentUser } = useAuth();

  const opportunitiesOptions = useMemo(() => ({ searchParams: { authority: [0, 1], issuer: currentUser?.issuer?.id } }), [currentUser]);
  const [errorOpportunities, loadingOpportunities, opportunities] = useOpportunities({}, opportunitiesOptions);

  const participationsOptions = useMemo(() => ({ searchParams: { opportunities: (opportunities?.data || []).map(({ id }) => id) || [0] } }), [opportunities]);
  const [errorParticipations, loadingParticipations, participations] = useParticipations({}, participationsOptions);

  const assertionsOptions = useMemo(() => ({ searchParams: { badges: (opportunities?.data || []).map(({ badgeId }) => badgeId) || [0] } }), [opportunities]);
  const [errorAssertions, loadingAssertions, assertions] = useAssertions({}, assertionsOptions);

  useErrorNotifier([errorOpportunities, errorParticipations, errorAssertions]);

  const mappedParticipations = new Map();
  (participations?.data || []).forEach(participation => {
    mappedParticipations.set(participation.OpportunityId, [...mappedParticipations.get(participation.OpportunityId) || [], participation]);
  });

  const mappedAssertions = new Map();
  (assertions?.data || []).forEach(assertion => {
    mappedAssertions.set(assertion.badgeId, [...mappedAssertions.get(assertion.badgeId) || [], assertion]);
  });

  return (
    <>
      <BannerSplit>
        <div>
          <div className="status-div">
            <p>{`Aangemaakte leerkansen: ${opportunities?.count || ''}`}</p>
            {loadingOpportunities && <LoadingSpinner />}
          </div>
          <div className="status-div">
            <p>{`Inschrijvingen: ${participations?.count || ''}`}</p>
            {(loadingOpportunities || loadingParticipations) && <LoadingSpinner />}
          </div>
          <div className="status-div">
            <p>{`Aangemaakte badges: ${assertions?.count || ''}`}</p>
            {(loadingOpportunities || loadingAssertions) && <LoadingSpinner />}
          </div>
          <Button text="Leerkans aanmaken" primary href={routes.issuer.CREATE_OPPORTUNITY} />
        </div>
      </BannerSplit>
      <Container>
        <article className="opportunities">
          {loadingOpportunities && <LoadingSpinner />}
          {(opportunities?.data || []).map((opportunity) => {
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

          .status-div {
            display: flex;
            grid-gap: 0.5rem;
          }

          .status-div p {
            margin: 0;
            font-size: 2rem;
            font-weight: 600;
            line-height: 2.7rem;
            color: white;
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
