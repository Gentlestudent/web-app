import { useMemo } from 'react';
import { Heading, BannerSplit } from '../../components/UI';
import { roles } from '../../constants';
import requiresRole from '../../hoc/requiresRole';
import { useOpportunities, useIssuers, useParticipations, useAssertions, useParticipants, useErrorNotifier } from '../../hooks';

const Dashboard = () => {
  const opportunitiesOptions = useMemo(() => ({ searchParams: { authority: [0, 1] } }), []);
  const [errorOpportunities, loadingOpportunities, opportunities] = useOpportunities({}, opportunitiesOptions);

  const [errorParticipations, loadingParticipations, participations] = useParticipations();

  const participantsOptions = useMemo(() => ({ searchParams: { roles: roles.PARTICIPANT } }), []);
  const [errorParticipants, loadingParticipants, participants] = useParticipants({}, participantsOptions);

  const issuersOptions = useMemo(() => ({ searchParams: { validated: true } }), []);
  const [errorIssuers, loadingIssuers, issuers] = useIssuers({}, issuersOptions);

  const [errorAssertions, loadingAssertions, assertions] = useAssertions();

  // TODO show loading

  useErrorNotifier([errorOpportunities, errorParticipations, errorParticipants, errorIssuers, errorAssertions]);

  return (
    <>
      <BannerSplit>
        <div>
          <Heading title={`Aangemaakte leerkansen: ${opportunities?.count || '-'}`} level={2} color="white" />
          <Heading title={`Inschrijvingen: ${participations?.count || '-'}`} level={2} color="white" />
          <Heading title={`Deelnemers: ${participants?.count || '-'}`} level={2} color="white" />
          <Heading title={`Issuers: ${issuers?.count || '-'}`} level={2} color="white" />
          <Heading title={`Aangemaakte badges: ${assertions?.count || '-'}`} level={2} color="white" />
        </div>
      </BannerSplit>

      <style jsx>
        {`
        `}
      </style>
    </>
  );
};

Dashboard.propTypes = {};

export default requiresRole(Dashboard, roles.ADMIN);
