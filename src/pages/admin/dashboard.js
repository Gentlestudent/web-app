import { useMemo } from 'react';
import { BannerSplit, LoadingSpinner } from '../../components/UI';
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

  useErrorNotifier([errorOpportunities, errorParticipations, errorParticipants, errorIssuers, errorAssertions]);

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
            {loadingParticipations && <LoadingSpinner />}
          </div>
          <div className="status-div">
            <p>{`Deelnemers: ${participants?.count || ''}`}</p>
            {loadingParticipants && <LoadingSpinner />}
          </div>
          <div className="status-div">
            <p>{`Issuers: ${issuers?.count || ''}`}</p>
            {loadingIssuers && <LoadingSpinner />}
          </div>
          <div className="status-div">
            <p>{`Aangemaakte badges: ${assertions?.count || ''}`}</p>
            {loadingAssertions && <LoadingSpinner />}
          </div>
        </div>
      </BannerSplit>

      <style jsx>
        {`
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
        `}
      </style>
    </>
  );
};

Dashboard.propTypes = {};

export default requiresRole(Dashboard, roles.ADMIN);
