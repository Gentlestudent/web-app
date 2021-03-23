import Router from 'next/router';
import { breakpoints } from '../assets/styles';
import FormWithSteps from '../components/form-with-steps';
import { Heading, Button } from '../components/UI';
import { Container } from '../components/layout/index';

import OPPORTUNITY_STEPS from '../pages/opportunities/steps';

export default () => {
  const createOpportunity = (opportunity) => console.log(opportunity);

  return (
    <>
      <Container>
        <Button onClick={() => Router.back()} text="Terug naar overzicht" icon="arrow-left" back />
        <div className="page">
          <div className="page-header">
            <Heading title="Nieuwe leerkans" />
            <FormWithSteps steps={OPPORTUNITY_STEPS} onCompleteAll={createOpportunity} />
          </div>
        </div>
      </Container>
      <style jsx>
        {`
          .page {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin: 0 15vw;
          }

          .page-header {
            padding: 3.2rem;
          }

          @media (max-width: ${breakpoints.medium}) {
            .page {
              margin: 0;
            }
          }
        `}
      </style>
    </>
  );
};
