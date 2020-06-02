import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { useSteps, useForm } from '../../hooks';
import { colors, breakpoints } from '../../assets/styles/constants';
import FormWithSteps from '../../components/form-with-steps';
import { Heading, FormGroup, Icon, Button } from '../../components/UI';
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
  const createOpportunity = (values) => {
    // push opportunity to firestore
  };

  return (
    <Layout>
      <GoBack />
      <div className="page">
        <div className="page-header">
          <Heading title="Nieuwe leerkans" />
          <FormWithSteps steps={OPPORTUNITY_STEPS} onCompleteAll={createOpportunity} />
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

Form.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.element
};
