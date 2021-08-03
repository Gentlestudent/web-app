import { useMemo } from 'react';
import { Heading, BannerSplit } from '../../components/UI';
import { roles } from '../../constants';
import requiresRole from '../../hoc/requiresRole';
import { useOpportunities, useIssuers, useParticipations, useAssertions, useParticipants } from '../../hooks';

const Dashboard = () => {
  const opportunitiesCountOptions = useMemo(() => ({ searchParams: { count: true, authority: [0, 1] } }), []);
  const [errorOpportunitiesCount, loadingOpportunitiesCount, opportunitiesCount] = useOpportunities(0, opportunitiesCountOptions);

  const participationsCountOptions = useMemo(() => ({ searchParams: { count: true } }), []);
  const [errorParticipationsCount, loadingParticipationsCount, participationsCount] = useParticipations(0, participationsCountOptions);

  const participantsCountOptions = useMemo(() => ({ searchParams: { count: true, roles: roles.PARTICIPANT } }), []);
  const [errorParticipantsCount, loadingParticipantsCount, participantsCount] = useParticipants(0, participantsCountOptions);

  const issuersCountOptions = useMemo(() => ({ searchParams: { count: true, validated: true } }), []);
  const [errorIssuersCount, loadingIssuersCount, issuersCount] = useIssuers(0, issuersCountOptions);

  const assertionsCountOptions = useMemo(() => ({ searchParams: { count: true } }), []);
  const [errorAssertionsCount, loadingAssertionsCount, assertionsCount] = useAssertions(0, assertionsCountOptions);

  // TODO handle error & show loading

  return (
    <>
      <BannerSplit>
        <div>
          <Heading title={`Aangemaakte leerkansen: ${opportunitiesCount}`} level={2} color="white" />
          <Heading title={`Inschrijvingen: ${participationsCount}`} level={2} color="white" />
          <Heading title={`Deelnemers: ${participantsCount}`} level={2} color="white" />
          <Heading title={`Issuers: ${issuersCount}`} level={2} color="white" />
          <Heading title={`Aangemaakte badges: ${assertionsCount}`} level={2} color="white" />
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
