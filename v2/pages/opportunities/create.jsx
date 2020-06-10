import Router from 'next/router';

import { colors, breakpoints } from '../../assets/styles';
import FormWithSteps from '../../components/form-with-steps';
import { Heading, Icon } from '../../components/UI';
import Layout from '../../components/layout';

import OPPORTUNITY_STEPS from './steps';

const GoBack = () => (
  <button type="button" onClick={() => Router.back()}>
    <Icon name="caret-left" />
    <span>Terug</span>
    <style jsx>
      {`
        button {
          display: flex;
          align-items: center;
          min-height: 4rem;
          margin-left: 1rem;
          background: none;
          border: none;
          font-weight: bold;
        }

        span {
          margin-left: 1rem;
          font-size: 1.8rem;
          color: ${colors.gray};
        }
      `}
    </style>
  </button>
);

export default () => {
  const createOpportunity = (opportunity) => console.log(opportunity);

  return (
    <Layout>
      <GoBack />
      <div className="page">
        <div className="page-header">
          <Heading title="Nieuwe leerkans" />
          <FormWithSteps
            title="Nieuwe leerkans"
            steps={OPPORTUNITY_STEPS}
            onCompleteAll={createOpportunity}
          />
        </div>
      </div>
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
    </Layout>
  );
};
