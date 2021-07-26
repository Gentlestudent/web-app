import { useState, useMemo } from 'react';
import { roles } from '../../constants';
import { Heading, Button } from '../../components/UI';
import { Container } from '../../components/layout/index';
import requiresRole from '../../hoc/requiresRole';
import { useOpportunities } from '../../hooks';
import { colors } from '../../assets/styles';
import { approveOpportunity } from '../../connector/opportunities';
// import { approveOpportunity, denyOpportunity } from '../../connector/opportunities';

const ValidateOpportunities = () => {
  const options = useMemo(() => ({ searchParams: { authority: 0 } }), []);
  const [opportunitiesError, opportunitiesLoading, opportunities, reloadOpportunities] = useOpportunities(options);
  // TODO handle error & add loading icon

  return (
    <>
      <Container>
        <Heading title="Leerkansen valideren" level={1} color="black" />
        {opportunitiesLoading && <div>...laden</div>}
        {!opportunitiesLoading && !opportunities.length && (
          <div>Er zijn geen te valideren leerkansen.</div>
        )}
        <div className="list">
          {opportunities.map(opportunity => <div key={opportunity.id}><Opportunity opportunity={opportunity} reloadOpportunities={reloadOpportunities} /></div>)}
        </div>
      </Container>

      <style jsx>
        {`
          .list {
            display: grid;
            grid: auto / repeat(3, 1fr);
            grid-gap: 16px;
          }
        `}
      </style>
    </>
  );
};

const Opportunity = ({ opportunity, reloadOpportunities }) => {
  const [loading, setLoading] = useState(false);
  // TODO show loading state

  async function handleAcceptClick() {
    try {
      setLoading(true);
      await approveOpportunity(opportunity.id);
      reloadOpportunities();
    } catch (error) {
      console.error(error);
      // TODO show error message
    } finally {
      setLoading(false);
    }
  }

  // async function handleDenyClick() {
  //   try {
  //     setLoading(true);
  //     await denyOpportunity(opportunity.id);
  //     setHidden(true);
  //   } catch (error) {
  //     console.error(error);
  //     // TODO show error message
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <>
      <div className="root">
        <Heading title={opportunity.title} level={2} color="black" />
        <small>{opportunity.beginDate + ' - ' + opportunity.endDate}</small>
        <p className="description">{opportunity.shortDescription}</p>
        <div className="flex">
          <Button disabled={loading} text="Accepteren" onClick={handleAcceptClick} primary />
          {/* <Button disabled={loading} text="Weigeren" onClick={handleDenyClick} primary /> */}
        </div>
      </div>

      <style jsx>
        {`
          .root {
            border-radius: 1rem;
            background: ${colors.blueLight};
            width: 400px;
            padding: 4.5rem;
          }

          .flex {
            display: flex;
            justify-content: space-between;
          }

          .description {
            max-height: 300px;
            overflow-y: auto;
          }
        `}
      </style>
    </>
  );
};

export default requiresRole(ValidateOpportunities, roles.ADMIN);
